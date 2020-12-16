package com.petdevs.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.petdevs.models.Usuario;

public class UserDetailsImpl implements UserDetails {
    			
	private static final long serialVersionUID = 1L;
	
	private String userName;
	
	private String password;
	
	private List<GrantedAuthority> authorities;
	
	
	//Construtores
	public UserDetailsImpl() {
		
	}
	
	public UserDetailsImpl(Usuario usuario) {
		this.userName = usuario.getEmailUsuario();
		this.password = usuario.getSenhaUsuario();
	}
	
	//Getters
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return this.authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.userName;
	}

	//Metodos
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
