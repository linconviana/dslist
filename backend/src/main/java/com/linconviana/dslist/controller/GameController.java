package com.linconviana.dslist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linconviana.dslist.dto.GameDTO;
import com.linconviana.dslist.dto.GameMinDTO;

import com.linconviana.dslist.service.GameService;

@RestController
@RequestMapping(value = "/games")
public class GameController {
	
	@Autowired
	private GameService gameService;
	
	@GetMapping
	public List<GameMinDTO> findAll(){
		
		return gameService.findAll();		
	}
	
	@GetMapping(value = "/{id}")
	public GameDTO findById(@PathVariable Long id){
		
		return gameService.findById(id);		
	}
	
	@PostMapping
	public GameDTO saveGame(@RequestBody GameDTO dto){
		
		return gameService.saveGame(dto);		
	}
	
	@PutMapping(value = "/{id}")
	public GameDTO updateGame(@PathVariable Long id,@RequestBody GameDTO dto){
		
		return gameService.updateGame(id, dto);		
	}

	@DeleteMapping(value = "/{id}")
	public void deleteGame(@PathVariable Long id){
		
		gameService.deleteGame(id);		
	}
}
