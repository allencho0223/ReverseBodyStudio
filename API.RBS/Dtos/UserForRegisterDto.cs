using System;
using System.ComponentModel.DataAnnotations;

namespace API.RBS.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage="UserName field is required.")]
        public string UserName { get; set; }
        [Required]
        public string Name { get; set; }
        
        [Required(ErrorMessage="Password field is required.")]
        // [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*|<>?]).{8,16}$", ErrorMessage="비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "비밀번호를 4 - 8 자리 입력하세요")]
        public string Password { get; set; }
        [Required]
        public string userType { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Purpose { get; set; }
    }
}