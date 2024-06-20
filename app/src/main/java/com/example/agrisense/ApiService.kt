package com.example.agrisense

import okhttp3.MultipartBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(
    val message: String,
    val user: UserData
) {
    data class UserData(
        val uid: String,
        val email: String,
        val stsTokenManager: TokenManager
    )

    data class TokenManager(
        val accessToken: String,
        val refreshToken: String,
        val expirationTime: Long
    )
}

data class SignUpRequest(val email: String, val password: String)
data class SignUpResponse(val message: String)

interface ApiService {
    @Multipart
    @POST("api/predict")
    fun uploadImage(@Part image: MultipartBody.Part): Call<ResponseBody>
    @POST("api/login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>
    @POST("api/register")
    fun register(@Body request: SignUpRequest): Call<SignUpResponse>
}
