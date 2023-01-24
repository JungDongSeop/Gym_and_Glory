package com.backend.db.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @Column(name = "user_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userSequence;
    private String email;
    private String password;
    private String nickname;
    private Integer gender;
    @Column(name = "tel_number")
    private String telNumber;
    private Integer level;
    private Float exp;
    @Column(name = "manner_point")
    private Float mannerPoint;
    @Column(name = "min_clear_time")
    private Time minClearTime;
    @Column(name = "total_play_time")
    private Time totalPlayTime;
    @Column(name = "profile_image_path")
    private String imagePath;

    @OneToMany(mappedBy = "User", cascade = CascadeType.ALL)
    private List<Attachment> attachedFiles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}