package com.petdevs.services;


import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.petdevs.models.Usuario;
import com.petdevs.models.UsuarioLogin;
import com.petdevs.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	public Usuario cadastrar(Usuario usuario) {
	
	if(usuarioRepository.findByEmailUsuario(usuario.getEmailUsuario()).isPresent())
			return null;
		
	  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	  String senhaEncoder = encoder.encode(usuario.getSenhaUsuario());	
	  usuario.setSenhaUsuario(senhaEncoder);
	  return usuarioRepository.save(usuario);
	}
	
	public Optional<UsuarioLogin> logar(Optional<UsuarioLogin> usuarioLogin){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(usuarioLogin.get().getEmail());
		 if(usuario.isPresent()) {
			 if(encoder.matches(usuarioLogin.get().getSenha(), usuario.get().getSenhaUsuario())) {
				 String auth = usuarioLogin.get().getEmail() + ":" + usuarioLogin.get().getSenha();
				 byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				 String authHeader = "Basic " + new String(encodedAuth);
				 
				 usuarioLogin.get().setToken(authHeader);
				 usuarioLogin.get().setNome(usuario.get().getNomeCompleto());
				 return usuarioLogin;
			 }
		 }
	    return null;
		
	}

}
