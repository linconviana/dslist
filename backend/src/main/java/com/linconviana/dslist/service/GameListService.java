package com.linconviana.dslist.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linconviana.dslist.dto.GameListDTO;
import com.linconviana.dslist.entities.GameList;
import com.linconviana.dslist.projections.GameMinProjection;
import com.linconviana.dslist.repository.GameListRepository;
import com.linconviana.dslist.repository.GameRepository;

@Service
public class GameListService {

	@Autowired
	private GameListRepository gameListRepository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional(readOnly = true)
	public List<GameListDTO> findAll() {
		
		List<GameList> result = gameListRepository.findAll();		
		return result.stream().map(x -> new GameListDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public GameListDTO findById(Long id) {
		
		Optional<GameList> result = gameListRepository.findById(id);
		GameList game = result.orElseThrow();
		return new GameListDTO(game);
	}
	
	@Transactional
	public void move(Long listId, int sourceIndex, int destinationIndex) {
		
		List<GameMinProjection> list = gameRepository.searchByList(listId);
		GameMinProjection obj = list.remove(sourceIndex);
		list.add(destinationIndex, obj);
		
		int min = sourceIndex < destinationIndex ? sourceIndex : destinationIndex;
		int max = sourceIndex < destinationIndex ? destinationIndex : sourceIndex;
		
		for (int i = min; i <= max; i++) {
			
			gameListRepository.updateBelongingPosition(listId, list.get(i).getId(), i);
		}
	}
}
