package BackEnd.StreetCode

import BackEnd.StreetCode.Product
import BackEnd.StreetCode.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun getAllProducts(): List<Product> = productRepository.findAll()
}