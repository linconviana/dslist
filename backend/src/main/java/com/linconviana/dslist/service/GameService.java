package com.linconviana.dslist.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.linconviana.dslist.dto.GameDTO;
import com.linconviana.dslist.dto.GameMinDTO;
import com.linconviana.dslist.entities.Game;
import com.linconviana.dslist.entities.GameList;
import com.linconviana.dslist.projections.GameMinProjection;
import com.linconviana.dslist.repository.BelongingRepository;
import com.linconviana.dslist.repository.GameListRepository;
import com.linconviana.dslist.repository.GameRepository;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepository;
	
	@Autowired
	private GameListRepository gameListRepository;
	
	@Autowired
	private BelongingRepository belongingRepository;
	
	@Autowired
	private BelongingService belongingService;
	
	@Transactional(readOnly = true)
	public List<GameMinDTO> findAll() {
		
		List<Game> result = gameRepository.findAll();		
		return result.stream().map(x -> new GameMinDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public GameDTO findById(Long id) {
		
		Optional<Game> result = gameRepository.findById(id);
		Game game = result.orElseThrow();
		return new GameDTO(game);
	}
	
	@Transactional(readOnly = true)
	public List<GameMinDTO> findByList(Long id) {
		
		List<GameMinProjection> result = gameRepository.searchByList(id);		
		return result.stream().map(x -> new GameMinDTO(x)).toList();
	}

	@Transactional
	public GameDTO saveGame(GameDTO dto) {

		Game entity = new Game();
		copyDtoToEntity(dto, entity);
		
		entity = gameRepository.save(entity);
		
		GameList gameList = gameListRepository.findById(dto.getListId()).get();
		
		belongingService.saveNewPosition(entity, gameList, dto.getListId());
		
		return new GameDTO(entity);
	}
	
	@Transactional
	public GameDTO updateGame(Long id, GameDTO dto) {

		Optional<Game> obj = gameRepository.findById(id);
		Game entity = obj.orElseThrow(); 
		copyDtoToEntity(dto, entity);
		
		entity = gameRepository.save(entity);
		
		return new GameDTO(entity);
	}
	
	@Transactional
	public void deleteGame(Long id) {

		belongingRepository.deleteByIdGame(id);
		gameRepository.deleteById(id);
	}
	
	private void copyDtoToEntity(GameDTO dto, Game entity) {
		entity.setTitle(dto.getTitle());
		entity.setGenre(dto.getGenre());
		entity.setPlatforms(dto.getPlatforms());
		entity.setScore(dto.getScore());
		entity.setYear(dto.getYear());
		entity.setImgUrl(dto.getImgUrl());
		entity.setShortDescription(dto.getShortDescription());
		entity.setLongDescription(dto.getLongDescription());
	}
}
