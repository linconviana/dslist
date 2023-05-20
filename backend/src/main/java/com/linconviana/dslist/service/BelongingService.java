package com.linconviana.dslist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linconviana.dslist.entities.Belonging;
import com.linconviana.dslist.entities.Game;
import com.linconviana.dslist.entities.GameList;
import com.linconviana.dslist.repository.BelongingRepository;

@Service
public class BelongingService {

	@Autowired
	private BelongingRepository belongingRepository;
	
	@Transactional
	public void saveNewPosition(Game game, GameList list, Long listId) {
		
		Integer position = belongingRepository.findLastPosition(listId) + 1;
		Belonging belonging = new Belonging(game, list, position);
		
		belongingRepository.save(belonging);
	}
}
