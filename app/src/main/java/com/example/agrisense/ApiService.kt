package com.example.agrisense

import okhttp3.MultipartBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {
    @Multipart
    @POST("api/predict")
    fun uploadImage(@Part image: MultipartBody.Part): Call<ResponseBody>
}
