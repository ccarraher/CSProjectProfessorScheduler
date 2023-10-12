package base.models;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

public class LoginResponseDto {
    private Integer userId;
    private String firstName;
    private String lastName;
    private Collection<? extends GrantedAuthority> authorities;
    private String jwt;

    public LoginResponseDto() {
        super();
    }

    public LoginResponseDto(Integer userId, String firstName, String lastName, Collection<? extends GrantedAuthority> authorities, String jwt) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorities = authorities;
        this.jwt = jwt;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstName() {return this.firstName;}

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
