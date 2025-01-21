package BackEnd.StreetCode

import BackEnd.StreetCode.Product
import BackEnd.StreetCode.ProductService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ProductController(private val productService: ProductService) {

    @GetMapping("/products")
    fun getProducts(): List<Product> = productService.getAllProducts()
}