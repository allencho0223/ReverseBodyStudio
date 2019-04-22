using System.Security.Claims;
using System.Threading.Tasks;
using API.RBS.Data;
using API.RBS.Dtos;
using API.RBS.Helpers;
using API.RBS.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.RBS.Controllers
{
    [Route("api/users/clients/{clientId}/[controller]")]
    [ApiController]
    public class ClientImagesController : ControllerBase
    {
        private readonly IRbsRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;

        // The reason for adding IOptions is because 
        // we provided this as a service inside our startup.cs
        public ClientImagesController(IRbsRepository repo
            , IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotos()
        {
            var clientImages = await _repo.GetPhotos();

            return Ok(clientImages);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForClient(int clientId
            , [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var clientFromRepo = await _repo.GetClient(clientId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(350).Height(350).Crop("fill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<ClientImage>(photoForCreationDto);

            clientFromRepo.ClientImages.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }
            return BadRequest("사진 업로드에 실패하였습니다.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int clientId, int id)
        {
            if (clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var client = await _repo.GetClient(clientId);

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repo.Delete(photoFromRepo);
            }

            if (photoFromRepo.PublicId == null)
                _repo.Delete(photoFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("사진 삭제에 실패하였습니다");
        }

    }
}