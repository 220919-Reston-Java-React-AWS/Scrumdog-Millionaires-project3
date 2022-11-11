package com.revature;

import com.revature.models.DM;
import com.revature.models.User;
import com.revature.repositories.DMRepository;
import com.revature.services.DMService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SocialMediaApplicationTests {

	@Mock
	private User user1;

	@Mock
	private User user2;

	@Mock
	private DMRepository dmRepository;

	@InjectMocks
	private DMService dmService;

	@Test
	void contextLoads() {
	}



	@Test
	public void testMessage() {
//		Arrange
		DM expected = new DM(1,"Hello",user1,user2);
		Mockito.when(dmRepository.save(expected)).thenReturn(expected);
//		Act
		DM actual = dmService.send(expected);
//		Assert
		Assertions.assertEquals(expected,actual);

	}

}
