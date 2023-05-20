package com.linconviana.dslist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linconviana.dslist.dto.GameListDTO;
import com.linconviana.dslist.dto.GameMinDTO;
import com.linconviana.dslist.dto.ReplacementDTO;
import com.linconviana.dslist.service.GameListService;
import com.linconviana.dslist.service.GameService;

@RestController
@RequestMapping(value = "/lists")
public class GameListController {
	
	@Autowired
	private GameListService gameListService;
	
	@Autowired
	private GameService gameService;
	
	@GetMapping
	public List<GameListDTO> findAll(){
		
		return gameListService.findAll();		
	}
	
	@GetMapping(value = "/{id}")
	public GameListDTO findById(@PathVariable Long id){
		
		return gameListService.findById(id);		
	}
	
	@GetMapping(value = "/{id}/games")
	public List<GameMinDTO> findByList(@PathVariable Long id){
		
		return gameService.findByList(id);		
	}

	@PostMapping(value = "/{listId}/replacement")
	public void findByList(@PathVariable Long listId, @RequestBody ReplacementDTO dto){
		
		gameListService.move(listId, dto.getSourceIndex(), dto.getDestinationIndex());		
	}
}
