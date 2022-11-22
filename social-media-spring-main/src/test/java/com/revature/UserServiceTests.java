package com.revature;

import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.revature.dtos.LoginRequest;
import com.revature.models.User;
import com.revature.repositories.UserRepository;
import com.revature.services.UserService;

public class UserServiceTests {

	@Mock
	private User user;

   	@Mock
	private UserRepository mockUserRepository;

	
	@InjectMocks
	private UserService userService;

	
	
    @Test
	void contextLoads() {
	}

	// @Test
	// public void testUpdatePassword() {
	// 	User testUser = new User();
	// 	when(mockUserRepository.findByEmailAndPassword("test@test.com", "oldpassword")).thenReturn(testUser);
	// 	String newPassword = "newPassword";

		
	// }

//     @Test
// 	public void testUpdatePassword() {

		
// //		Arrange
// 		User user = new User(1, "test12@gmail.com","OldPassword","Test12","User12");
// 		String expectedPassword = "NewPassword";
// 		LoginRequest newpass = new LoginRequest(user.getEmail(),  expectedPassword);
// 		//run this in oldUser
// 		Mockito.when(mockUserRepository.save(user)).thenReturn(new User(1, "test12@gmail.com",expectedPassword,"Test12","User12"));

// 		// Act

// 		User actual = userService.updatePassword(newpass);
		
	
// 		//Assertion
//         Assertions.assertEquals(expectedPassword, actual.getPassword());
// 	}

}
