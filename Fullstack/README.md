# Login Web Application

Aplikasi web login modern yang dibangun dengan React + Ant Design untuk frontend, Spring Boot untuk backend, dan SQL Server untuk database. Aplikasi ini menggunakan JWT untuk autentikasi dan memiliki desain UI yang menarik sesuai dengan mockup yang diberikan.

## 🚀 Teknologi yang Digunakan

### Backend
- **Java JDK 21** (LTS terbaru)
- **Spring Boot 3.3.5**
- **Spring Security** dengan JWT
- **Spring Data JPA**
- **SQL Server 2022**
- **Maven** sebagai build tool

### Frontend
- **React 18**
- **Ant Design 5.12.8**
- **Axios** untuk HTTP requests
- **React Router** untuk routing
- **Node.js 22 LTS**

### Database
- **SQL Server 2022**

## 📁 Struktur Proyek

```
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/loginbackend/
│   │       ├── config/      # Security & JWT Configuration
│   │       ├── controller/  # REST Controllers
│   │       ├── dto/         # Data Transfer Objects
│   │       ├── entity/      # JPA Entities
│   │       ├── repository/  # Data Repositories
│   │       └── service/     # Business Logic
│   ├── src/main/resources/
│   │   └── application.yml  # Configuration
│   └── Dockerfile
├── frontend/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── contexts/        # React Context
│   │   └── services/        # API Services
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml       # Docker Compose Configuration
```

## 🛠️ Cara Menjalankan Aplikasi

### Prerequisites
- Docker dan Docker Compose
- Git

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd login-app
   ```

2. **Jalankan dengan Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Akses aplikasi**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Database: localhost:1433

### Atau jalankan secara terpisah

#### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## 🔐 Fitur Keamanan

- **JWT Authentication**: Token-based authentication
- **Password Encryption**: Menggunakan BCrypt
- **CORS Configuration**: Konfigurasi CORS yang aman
- **Input Validation**: Validasi input di backend dan frontend
- **SQL Injection Protection**: Menggunakan JPA/Hibernate
- **XSS Protection**: Headers keamanan di nginx

## 🎨 Fitur UI/UX

- **Responsive Design**: Tampilan yang responsif di semua device
- **Modern UI**: Menggunakan Ant Design components
- **Gradient Background**: Background gradient yang menarik
- **Smooth Animations**: Transisi yang halus
- **Form Validation**: Validasi form real-time
- **Loading States**: Indikator loading yang jelas

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru
- `GET /api/auth/test` - Test endpoint

### Request/Response Format

#### Login Request
```json
{
  "username": "string",
  "password": "string"
}
```

#### Register Request
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Auth Response
```json
{
  "token": "string",
  "type": "Bearer",
  "username": "string",
  "email": "string"
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME2,
    updated_at DATETIME2,
    is_active BIT DEFAULT 1
);
```

## 🔧 Konfigurasi

### Backend Configuration (application.yml)
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:sqlserver://localhost:1433;databaseName=login_db
    username: sa
    password: YourPassword123!
  
jwt:
  secret: mySecretKey123456789012345678901234567890
  expiration: 86400000 # 24 hours
```

### Frontend Configuration
- API URL: `http://localhost:8080/api`
- Token storage: localStorage

## 🚀 Deployment

### Docker Production
```bash
# Build dan jalankan semua services
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment
1. Build backend: `./mvnw clean package`
2. Build frontend: `npm run build`
3. Deploy JAR file dan static files ke server

## 🧪 Testing

### Backend Testing
```bash
cd backend
./mvnw test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Clean Code Principles

- **Single Responsibility**: Setiap class/function memiliki satu tanggung jawab
- **DRY (Don't Repeat Yourself)**: Menghindari duplikasi kode
- **SOLID Principles**: Mengikuti prinsip SOLID
- **Consistent Naming**: Penamaan yang konsisten dan jelas
- **Proper Error Handling**: Penanganan error yang baik
- **Documentation**: Komentar dan dokumentasi yang jelas

## 🔒 Security Best Practices

- Password hashing dengan BCrypt
- JWT token dengan expiration
- CORS configuration
- Input validation dan sanitization
- SQL injection prevention
- XSS protection headers
- Secure HTTP headers

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

## 📄 License

MIT License
