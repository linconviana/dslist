package com.linconviana.dslist.dto;

import java.util.Objects;

import com.linconviana.dslist.entities.GameList;

public class GameListDTO {

	private Long id;
	private String name;
	
	public GameListDTO() {}

	public GameListDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public GameListDTO(GameList entity) {
		id = entity.getId();
		name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GameListDTO other = (GameListDTO) obj;
		return Objects.equals(id, other.id);
	}
}
