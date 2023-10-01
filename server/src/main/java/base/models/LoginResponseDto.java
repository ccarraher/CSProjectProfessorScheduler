package base.models;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

public class LoginResponseDto {
    private Integer userId;
    private Collection<? extends GrantedAuthority> authorities;
    private String jwt;

    public LoginResponseDto() {
        super();
    }

    public LoginResponseDto(Integer userId, Collection<? extends GrantedAuthority> authorities, String jwt) {
        this.userId = userId;
        this.authorities = authorities;
        this.jwt = jwt;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public String getJwt() {
        return this.jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
