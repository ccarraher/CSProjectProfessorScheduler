package base.models;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

public class LoginResponseDto {
    private String NetID;
    private String firstName;
    private String lastName;
    private Collection<? extends GrantedAuthority> authorities;
    private String jwt;

    public LoginResponseDto() {
        super();
    }

    public LoginResponseDto(String NetID, String firstName, String lastName, Collection<? extends GrantedAuthority> authorities, String jwt) {
        this.NetID = NetID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorities = authorities;
        this.jwt = jwt;
    }

    public String getUserId() {
        return this.NetID;
    }

    public void setUserId(String NetID) {
        this.NetID = NetID;
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
