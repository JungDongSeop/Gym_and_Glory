package com.backend.db.entity;

import com.backend.util.AttachmentType;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name="ATTACHMENT_SEQ_GENERATOR",
        sequenceName = "ATTACHMENT_SEQ"
)
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String originFilename;
    private String storeFilename;
    @Enumerated(EnumType.STRING)
    private AttachmentType attachmentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Builder
    public Attachment(Long id, String originFileName, String storePath, AttachmentType attachmentType) {
        this.id = id;
        this.originFilename = originFileName;
        this.storeFilename = storePath;
        this.attachmentType = attachmentType;
    }
}
