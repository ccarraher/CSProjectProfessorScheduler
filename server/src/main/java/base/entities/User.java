package base.entities;

import base.entities.Role;
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
    @Column(name = "Authorization")
    private String authorization;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "LastName")
    private String lastName;
    @Column(name = "UserType")
    private String userType;

    @ManyToMany(fetch = FetchType.EAGER)    // Tells db we want to fetch authorities as soon as we fetch the data for the user
    @JoinTable(name = "user_role_junction", joinColumns = {@JoinColumn(name = "NetID")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> authorities;

    public User() {
        super();
        this.authorities = new HashSet<Role>();
    }

    public User(String netID, String Authorization, Set<Role> authorities, String firstName, String lastName, String userType) {
        super();
        this.username = netID;
        this.authorization = Authorization;
        this.authorities = authorities;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userType = userType;
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
        return this.authorization;
    }

    public void setPassword(String Authorization) {
        this.authorization = Authorization;
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
        return this.firstName;
    }

    public void setFirstName(String FirstName) {
        this.firstName = FirstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String LastName) {
        this.lastName = LastName;
    }
}
