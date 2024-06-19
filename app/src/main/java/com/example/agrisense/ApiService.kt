package com.example.agrisense.api

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val token: String)
data class SignUpRequest(val email: String, val password: String)
data class SignUpResponse(val message: String)

interface ApiService {
    @POST("api/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>
    @POST("api/register")
    fun register(@Body request: SignUpRequest): Call<SignUpResponse>
}
