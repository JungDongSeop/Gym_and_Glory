package com.backend.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_sequence")
    private Long reportSequence;

    @ManyToOne
    @JoinColumn(name = "send_sequence")
    private User sendUser;

    @ManyToOne
    @JoinColumn(name = "get_sequence")
    private User getUser;

    private Integer kind;

    private String contents;

    @Column(name = "register_time")
    private String registerTime;

    private Integer confirmation;

}
