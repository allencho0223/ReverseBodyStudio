using System.ComponentModel.DataAnnotations;

namespace API.RBS.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage="아아디를 입력하세요.")]
        public string UserName { get; set; }
        
        [Required(ErrorMessage="비밀번호를 입력하세요")]
        // [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*|<>?]).{8,16}$", ErrorMessage="비밀번호는 최소 소문자, 대문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "비밀번호를 4 - 8 자리 입력하세요")]
        public string Password { get; set; }
    }
}