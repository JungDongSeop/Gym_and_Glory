package com.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "friend_accept_list")
public class SendFriend {

    @Id
    @Column(name = "send_sequence")
    private Integer sendSequence;

    @Column(name = "get_sequence")
    private Integer getSequence;
}
