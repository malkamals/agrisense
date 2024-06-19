package com.example.agrisense

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.agrisense.api.LoginRequest
import com.example.agrisense.api.LoginResponse
import com.example.agrisense.api.RetrofitClient
import com.example.agrisense.databinding.ActivitySignInBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignInActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySignInBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignInBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.textView.setOnClickListener {
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }

        binding.button.setOnClickListener {
            val email = binding.emailEt.text.toString().trim()
            val pass = binding.passET.text.toString().trim()

            if (email.isNotEmpty() && pass.isNotEmpty()) {
                val loginRequest = LoginRequest(email, pass)
                RetrofitClient.apiService.login(loginRequest).enqueue(object : Callback<LoginResponse> {
                    override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                        if (response.isSuccessful) {
                            val loginResponse = response.body()
                            val accessToken = loginResponse?.user?.stsTokenManager?.accessToken
                            Log.d("LoginResponse", accessToken.toString())
                            val intent = Intent(this@SignInActivity, MainActivity::class.java)
                            intent.putExtra("accessToken", accessToken)
                            startActivity(intent)
                            finish()
                        } else {
                            Toast.makeText(this@SignInActivity, "Login failed: ${response.message()}", Toast.LENGTH_SHORT).show()
                            Log.d("LoginResponse", response.message())
                        }
                    }

                    override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                        Toast.makeText(this@SignInActivity, "Login failed: ${t.message}", Toast.LENGTH_SHORT).show()
                        Log.d("LoginResponse", t.message.toString())
                    }
                })
            } else {
                Toast.makeText(this, "Isi semua field!", Toast.LENGTH_SHORT).show()
                Log.d("LoginResponse", "Isi semua field!")
            }
        }
    }
}
