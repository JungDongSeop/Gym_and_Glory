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
    private Integer reportSequence;

    @Column(name = "send_sequence")
    private Integer sendSequence;

    @Column(name = "get_sequence")
    private Integer getSequence;

    private Integer kind;

    private String contents;

    @Column(name = "register_time")
    private String registerTime;

    private Integer confirmation;

}
