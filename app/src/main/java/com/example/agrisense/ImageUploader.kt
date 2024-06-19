package com.example.agrisense

import android.content.Intent
import android.net.Uri
import android.util.Log
import android.widget.Toast
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import org.json.JSONObject

class ImageUploader {
    fun uploadImage(imageUri: Uri, context: MainActivity) {
        val file = File(context.getRealPathFromURI(imageUri))
        val requestFile = RequestBody.create("image/*".toMediaTypeOrNull(), file)
        val body = MultipartBody.Part.createFormData("image", file.name, requestFile)

        val call = RetrofitClient.instance.uploadImage(body)
        call.enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.isSuccessful) {
                    response.body()?.let {
                        val responseString = it.string()
                        val jsonResponse = JSONObject(responseString)
                        val result = jsonResponse.getJSONObject("data").getString("result")
                        Log.d("ImageUploader", "Response: $responseString")
                        val intent = Intent(context, ResultActivity::class.java).apply {
                            putExtra("uploadResponse", result)
                            putExtra("imageUri", imageUri.toString())
                        }
                        context.startActivity(intent)
                    }
                } else {
                    Log.e("ImageUploader", "Upload failed: ${response.errorBody()?.string()}")
                }
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                Log.e("ImageUploader", "Upload error: ${t.message}")
                Toast.makeText(context, "Upload failed", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
