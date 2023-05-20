package com.linconviana.dslist.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name =  "tb_belonging")
public class Belonging implements Serializable {
	private static final long serialVersionUID = 1L;

	/// :: Outra maneira de criar um relacionamento ManyToMany quando precisamos de mais um atributo 
	@EmbeddedId
	private BelongingPK id = new BelongingPK();
	private Integer position;
	
	public Belonging() {}

	public Belonging(Game game, GameList list, Integer position) {

		id.setGame(game);
		id.setList(list);
		this.position = position;
	}

	public BelongingPK getId() {
		return id;
	}

	public void setId(BelongingPK id) {
		this.id = id;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
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
		Belonging other = (Belonging) obj;
		return Objects.equals(id, other.id);
	} 
}
