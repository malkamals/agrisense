package com.example.agrisense

import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.example.agrisense.databinding.ActivityResultBinding

class ResultActivity : AppCompatActivity() {
    private lateinit var binding: ActivityResultBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityResultBinding.inflate(layoutInflater)
        setContentView(binding.root)
        try {
            val uploadResponse = intent.getStringExtra("uploadResponse")
            val imageUriString = intent.getStringExtra("imageUri")

            displayResult(uploadResponse, Uri.parse(imageUriString))
        }
        catch(e: Exception) {
            Log.e("Result", "Error: ${e.message}")
            Toast.makeText(this, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    private fun displayResult(response: String?,image: Uri) {
        binding.resultImage.setImageURI(image)
        binding.resultText.text = "Hasil: $response"
    }
}