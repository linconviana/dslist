package com.linconviana.dslist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.linconviana.dslist.entities.Belonging;

@Repository
public interface BelongingRepository extends JpaRepository<Belonging, Long> {

	@Query(nativeQuery = true, value = """
			SELECT Max(position) FROM TB_BELONGING 
			where list_id in (:listId)
				""")
	public Integer findLastPosition(Long listId);

	@Modifying
	@Query(nativeQuery = true, value = """
			DELETE FROM tb_belonging
			WHERE game_id in (:id)
				""")
	public void deleteByIdGame(Long id);
}
