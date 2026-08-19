package com.npst.petadoption.auth.services;

import com.npst.petadoption.auth.dtos.LoginRequest;
import com.npst.petadoption.auth.dtos.LoginResponse;
import com.npst.petadoption.auth.dtos.RegisterResponse;
import com.npst.petadoption.common.exceptions.ConflictException;
import com.npst.petadoption.security.CustomUserDetailsService;
import com.npst.petadoption.security.JwtService;
import com.npst.petadoption.auth.dtos.RegisterRequest;
import com.npst.petadoption.users.entities.User;
import com.npst.petadoption.users.entities.UserRole;
import com.npst.petadoption.users.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    public RegisterResponse register(RegisterRequest request) {

        if (this.userRepository.existsByEmail(request.email())) {
            throw new ConflictException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(this.passwordEncoder.encode(request.passwordHash()))
                .role(UserRole.USER)
                .build();

        this.userRepository.save(user);

        return new RegisterResponse(user.getEmail() + " is now registered in our system!");
    }

    public LoginResponse login(LoginRequest request) {

        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.passwordHash()
                )
        );

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.email());

        String token = this.jwtService.generateToken(userDetails);

        return new LoginResponse(token);
    }
}