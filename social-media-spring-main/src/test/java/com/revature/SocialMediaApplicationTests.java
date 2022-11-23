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

import java.util.ArrayList;
import java.util.List;

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
	public void testMessageSend() {
//		Arrange
		DM expected = new DM(1,"Hello",user1,user2);
		Mockito.when(dmRepository.save(expected)).thenReturn(expected);
//		Act
		DM actual = dmService.send(expected);
//		Assert
		Assertions.assertEquals(expected,actual);

	}

	@Test
	public void testMessageReceive() {
//		Arrange
		DM newDM = new DM(2,"How are you?", user2, user1);
		List<DM> expected = new ArrayList<DM>();
		expected.add(newDM);
		Mockito.when(dmRepository.findBySender(user2)).thenReturn(expected);
//		Act
		List<DM> actual = dmService.getAllByUser(user2);
//		Assert
		Assertions.assertEquals(expected,actual);
	}

	@Test
	public void testMessagesBetweenUsers() {
//		Arrange
		DM newDM1 = new DM(2,"How are you?", user2, user1);
		DM newDM2 = new DM(3,"I'm fine. How abaout you?", user1, user2);
		List<DM> expected = new ArrayList<DM>();
		expected.add(newDM1);
		expected.add(newDM2);
		Mockito.when(dmRepository.findBySender(user2)).thenReturn(expected);
//		Act
		List<DM> actual = dmService.getAllBetweenUsers(user1, user2);
//		Assert
		Assertions.assertEquals(expected,actual);
	}

}
