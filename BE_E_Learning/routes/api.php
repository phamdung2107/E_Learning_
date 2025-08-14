<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Controllers\api\v1\InstructorController;
use App\Http\Controllers\api\v1\CategoryController;
use App\Http\Controllers\api\v1\CourseController;
use App\Http\Controllers\api\v1\LessonController;
use App\Http\Controllers\api\v1\AnswerController;
use App\Http\Controllers\api\v1\QuestionController;
use App\Http\Controllers\api\v1\ProgressTrackingController;
use App\Http\Controllers\api\v1\ReviewController;
use App\Http\Controllers\api\v1\EnrollmentController;
use App\Http\Controllers\api\v1\CertificateController;
use App\Http\Controllers\api\v1\QuizController;
use App\Http\Controllers\api\v1\NotificationController;
use App\Http\Controllers\api\v1\OrderController;
use App\Http\Controllers\api\v1\PaymentController;
use App\Http\Controllers\api\v1\EventController;
use App\Http\Controllers\api\v1\AiRecommendationController;
use App\Http\Controllers\api\v1\ResultQuizController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgot']);
Route::post('verify', [AuthController::class, 'verify']);
Route::post('forgot-password/update-password', [AuthController::class, 'changePassword']);
Route::get('logout', [AuthController::class, 'logout']);
Route::get('refresh', [AuthController::class, 'refresh']);
Route::get('me', [AuthController::class, 'me']);


Route::apiResource('users', UserController::class);
Route::post('users/change-password', [UserController::class, 'changePassword']);
Route::post('users/reset-users/{user}', [UserController::class, 'resetUserPassword']);   // admin  
Route::post('admin/change-role/{user}', [UserController::class, 'updateRole']);  // admin  
Route::post('admin/change-status/{user}', [UserController::class, 'updateStatus']);  // admin  
Route::get('admin/countusers', [UserController::class, 'countUsers']);   // admin  


Route::post('instructors/request', [InstructorController::class, 'requestInstructor']);
Route::post('instructors/approve/{userId}', [InstructorController::class, 'approveInstructor']);   // admin  
Route::post('instructors/reject/{userId}', [InstructorController::class, 'rejectInstructor']);   // admin  
Route::get('instructors/{id}/courses', [InstructorController::class, 'getCourses']);  // instructor  
Route::get('instructors/{id}/revenue', [InstructorController::class, 'getRevenue']);    // instructor
Route::get('instructors/{id}/students', [InstructorController::class, 'getStudents']);   // instructor
Route::get('instructors/top/revenue', [InstructorController::class, 'TopInstructors']); 
Route::get('instructors/by-user/{userId}', [InstructorController::class, 'getInstructorByUserId']);   // instructor
Route::get('instructors/{id}/monthly-revenue', [InstructorController::class, 'getMonthlyRevenue']);
Route::get('admin/monthly-revenue', [InstructorController::class, 'getMonthlyRevenueWebsite']);
Route::get('instructors/requested-students', [InstructorController::class, 'requestedStudents']);
Route::apiResource('instructors', InstructorController::class);

Route::prefix('categories')->group(function () {
    Route::post('/', [CategoryController::class, 'store']);               // admin     
    Route::get('/{id}', [CategoryController::class, 'show']);                 // admin   
    Route::put('/{id}', [CategoryController::class, 'update']);               // admin  
    Route::delete('/{id}', [CategoryController::class, 'destroy']);         // admin  
    Route::get('/', [CategoryController::class, 'index']);                     
    Route::get('/tree/all', [CategoryController::class, 'getTree']);         
    Route::get('/{id}/children', [CategoryController::class, 'getChildren']); 
    Route::get('/parent/all', [CategoryController::class, 'getParentCategories']); 
    Route::get('/{id}/courses', [CategoryController::class, 'getCoursesByCategory']);  
});

Route::apiResource('courses', CourseController::class);

Route::prefix('courses')->group(function () {
    Route::get('my/enrolled', [CourseController::class, 'getMyCourses']);      
    Route::get('{courseId}/lessons-with-quizzes', [CourseController::class, 'getLessonsWithQuizzes']);
    Route::post('{id}/publish', [CourseController::class, 'publish']);    // admin  
    Route::post('{id}/draft', [CourseController::class, 'draft']);    // admin  
    Route::post('{id}/archive', [CourseController::class, 'archive']);    // instructor  
    Route::post('{id}/pending', [CourseController::class, 'pending']);    // instructor  
});


Route::prefix('lessons')->group(function () {
    Route::get('/', [LessonController::class, 'index']);  
    Route::post('/', [LessonController::class, 'store']);  // instructor
    Route::get('/{id}', [LessonController::class, 'show']);    
    Route::put('/{id}', [LessonController::class, 'update']);   // instructor
    Route::delete('/{id}', [LessonController::class, 'destroy']);     // instructor
    Route::get('/course/{courseId}', [LessonController::class, 'getByCourse']);    
});

Route::prefix('quizzes')->group(function () {
    Route::get('/', [QuizController::class, 'index']);
    Route::post('/', [QuizController::class, 'store']);      // instructor
    Route::get('/{id}', [QuizController::class, 'show']);
    Route::put('/{id}', [QuizController::class, 'update']);      // instructor
    Route::delete('/{id}', [QuizController::class, 'destroy']);        // instructor
    Route::get('/lesson/{lessonId}', [QuizController::class, 'getByLesson']);    
});

Route::prefix('questions')->group(function () {
    Route::get('/', [QuestionController::class, 'index']);
    Route::post('/', [QuestionController::class, 'store']);        // instructor
    Route::get('/{id}', [QuestionController::class, 'show']);
    Route::put('/{id}', [QuestionController::class, 'update']);      // instructor
    Route::delete('/{id}', [QuestionController::class, 'destroy']);      // instructor
    Route::get('/quiz/{quizId}', [QuestionController::class, 'getByQuiz']);
});

Route::prefix('answers')->group(function () {
    Route::get('/', [AnswerController::class, 'index']);
    Route::post('/', [AnswerController::class, 'store']);     // instructor
    Route::get('/{id}', [AnswerController::class, 'show']);
    Route::put('/{id}', [AnswerController::class, 'update']);         // instructor
    Route::delete('/{id}', [AnswerController::class, 'destroy']);       // instructor
    Route::get('/question/{questionId}', [AnswerController::class, 'getByQuestion']);
});


Route::prefix('progress')->group(function () {
    Route::get('/', [ProgressTrackingController::class, 'index']);
    Route::get('/summary', [ProgressTrackingController::class, 'getSummaryForCurrentUser']);
    Route::get('/{id}', [ProgressTrackingController::class, 'show']);
    Route::post('/', [ProgressTrackingController::class, 'store']);
    Route::put('/{id}', [ProgressTrackingController::class, 'update']);
    Route::delete('/{id}', [ProgressTrackingController::class, 'destroy']);
    Route::get('/user/{userId}/course/{courseId}', [ProgressTrackingController::class, 'getByUserCourse']);
    Route::post('/complete', [ProgressTrackingController::class, 'completeLesson']);
    Route::get('/is-course-completed/user/{userId}/course/{courseId}', [ProgressTrackingController::class, 'isCourseCompleted']);
});


Route::prefix('reviews')->group(function () {
    Route::get('/', [ReviewController::class, 'index']);
    Route::post('/', [ReviewController::class, 'store']);
    Route::get('/{id}', [ReviewController::class, 'show']);
    Route::put('/{id}', [ReviewController::class, 'update']);
    Route::delete('/{id}', [ReviewController::class, 'destroy']);
    Route::get('/course/{courseId}', [ReviewController::class, 'getByCourse']);      // instructor
    Route::get('/user/{userId}', [ReviewController::class, 'getByUser']);    
    Route::get('/average/{courseId}', [ReviewController::class, 'averageRating']);
});


Route::prefix('enrollments')->group(function () {
    // Route::post('/', [EnrollmentController::class, 'enroll']);
    // Route::post('/cancel', [EnrollmentController::class, 'cancel']);
    // Route::delete('/{id}', [EnrollmentController::class, 'destroy']);
    Route::get('/', [EnrollmentController::class, 'index']);
    Route::get('/{id}', [EnrollmentController::class, 'show']);
    Route::get('/user/{userId}', [EnrollmentController::class, 'getCoursesByUser']);
    Route::get('/course/{courseId}', [EnrollmentController::class, 'getUsersByCourse']);       // instructor
    Route::get('/count/{courseId}', [EnrollmentController::class, 'countEnrollments']);
    Route::get('/top/courses', [EnrollmentController::class, 'topCourses']);
    Route::get('/check/{userId}/{courseId}', [EnrollmentController::class, 'checkEnrollment']);
});


Route::prefix('certificates')->group(function () {
    Route::get('/', [CertificateController::class, 'index']);
    Route::get('/check', [CertificateController::class, 'checkCertificate']);
    Route::post('/', [CertificateController::class, 'store']);
    Route::get('/{id}', [CertificateController::class, 'show']);
    Route::delete('/{id}', [CertificateController::class, 'destroy']);  // bỏ
});


Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/unread', [NotificationController::class, 'unread']);
    Route::get('/{id}', [NotificationController::class, 'show']);
    Route::put('/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
});


Route::prefix('orders')->group(function () {
    Route::get('/', [OrderController::class, 'index']); // Danh sách đơn hàng
    Route::get('/{id}', [OrderController::class, 'show']); // Chi tiết đơn
    Route::post('/', [OrderController::class, 'create']); // Tạo đơn (pending)
    Route::put('/{id}/confirm', [OrderController::class, 'confirm']); // Xác nhận thanh toán
    Route::put('/{id}/cancel', [OrderController::class, 'cancel']); // Hủy đơn
    Route::delete('/{id}', [OrderController::class, 'destroy']); // Xoá mềm đơn
});


Route::prefix('wallet')->group(function () {
    Route::post('/create-topup', [PaymentController::class, 'createVNPayTopup']);
    Route::get('/return', [PaymentController::class, 'handleVNPayReturn']);
    Route::get('/', [PaymentController::class, 'index']); // Admin: danh sách giao dịch
    Route::get('/my', [PaymentController::class, 'myTransactions']); // User: giao dịch cá nhân
    Route::post('/withdraw', [PaymentController::class, 'requestWithdraw']); // User gửi yêu cầu rút
    Route::put('/withdraw/{id}/approve', [PaymentController::class, 'approveWithdraw']); // Admin duyệt
    Route::put('/withdraw/{id}/reject', [PaymentController::class, 'rejectWithdraw']); // Admin từ chối
});

Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::post('/', [EventController::class, 'store']);   // admin  
    Route::get('/maximum-bonus-percent', [EventController::class, 'getMaximumBonusPercent']);
    Route::get('/{id}', [EventController::class, 'show']);
    Route::put('/{id}', [EventController::class, 'update']);   // admin  
    Route::delete('/{id}', [EventController::class, 'destroy']);    // admin  
    Route::patch('/{id}/toggle', [EventController::class, 'toggleStatus']);    // admin  
});


Route::prefix('ai-recommendation')->group(function () {
    Route::post('/', [AiRecommendationController::class, 'store']);
    Route::get('/', [AiRecommendationController::class, 'index']);
    Route::post('/ai', [AiRecommendationController::class, 'recommendOnly']);

});


Route::prefix('result-quizzes')->group(function () {
    Route::post('/submit', [ResultQuizController::class, 'submit']);
    Route::get('/quiz/{quizId}', [ResultQuizController::class, 'getByQuiz']);    // instructor
    Route::get('/my/{quizId}', [ResultQuizController::class, 'getMyByQuiz']);
    Route::get('/by-lesson/{lessonId}', [ResultQuizController::class, 'getMyResultByLesson']);  // instructor
});

