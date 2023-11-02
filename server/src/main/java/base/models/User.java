package base.models;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @Column(name = "NetID", unique = true, nullable = false)
    private String username;
    private String Authorization;
    private String FirstName;
    private String LastName;
    private String UserType;

    @ManyToMany(fetch = FetchType.EAGER)    // Tells db we want to fetch authorities as soon as we fetch the data for the user
    @JoinTable(name = "user_role_junction", joinColumns = {@JoinColumn(name = "NetID")}, inverseJoinColumns = {@JoinColumn(name = "roleId")})
    private Set<Role> authorities;

    public User() {
        super();
        this.authorities = new HashSet<Role>();
    }

    public User(String NetID, String Authorization, Set<Role> authorities, String FirstName, String LastName, String UserType) {
        super();
        this.username = NetID;
        this.Authorization = Authorization;
        this.authorities = authorities;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserType = UserType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return this.Authorization;
    }

    public void setPassword(String Authorization) {
        this.Authorization = Authorization;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String NetID) {
        this.username = NetID;
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

    public String getFirstName() {
        return this.FirstName;
    }

    public void setFirstName(String FirstName) {
        this.FirstName = FirstName;
    }

    public String getLastName() {
        return this.LastName;
    }

    public void setLastName(String LastName) {
        this.LastName = LastName;
    }
}
