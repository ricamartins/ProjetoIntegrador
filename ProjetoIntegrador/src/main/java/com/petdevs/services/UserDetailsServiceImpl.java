package com.petdevs.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.petdevs.models.Usuario;
import com.petdevs.repositories.UsuarioRepository;
import com.petdevs.security.UserDetailsImpl;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(email);
		usuario.orElseThrow(() -> new UsernameNotFoundException(email + " Not Found"));
		return usuario.map(UserDetailsImpl::new).get();
	}
	

}
