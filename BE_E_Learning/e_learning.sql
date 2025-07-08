-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 04, 2025 at 01:09 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_learning`
--

-- --------------------------------------------------------

--
-- Table structure for table `ai_recommendations`
--

CREATE TABLE `ai_recommendations` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reason` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_text` text COLLATE utf8mb4_general_ci,
  `is_correct` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `is_correct`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Personal Home Page', 0, 1, '2025-06-25 08:04:56', '2025-06-25 01:17:36'),
(2, 1, 'Personal Home Page', 1, 0, '2025-06-25 08:04:56', '2025-06-25 01:19:27'),
(3, 1, 'Programming HTML Processor', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(4, 1, 'Page Handler Protocol', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(5, 2, 'Một framework PHP', 1, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(6, 2, 'Một ngôn ngữ lập trình', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(7, 2, 'Công cụ tạo video', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(8, 2, 'Thư viện JavaScript', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(9, 3, 'php artisan make:controller', 1, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(10, 3, 'php artisan new:controller', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(11, 3, 'php create:controller', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(12, 3, 'make controller', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(13, 4, 'Tạo bảng dữ liệu', 1, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(14, 4, 'Tạo file config', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(15, 4, 'Chạy server', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(16, 4, 'Khởi tạo project', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(17, 5, 'Công cụ ORM của Laravel', 1, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(18, 5, 'Một gói thư viện khác', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(19, 5, 'Module API', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(20, 5, 'Framework Java', 0, 0, '2025-06-25 08:04:56', '2025-06-25 08:04:56'),
(21, 1, 'Personal Home Page1', 0, 0, '2025-06-25 01:34:06', '2025-06-25 01:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 'Lập trình Web', NULL, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(2, 'Lập trình Mobile', NULL, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(3, 'Thiết kế UI/UX', NULL, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(4, 'Khoa học Dữ liệu', NULL, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(5, 'Machine Learning', 4, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(6, 'Lập trình ReactJS', 1, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(7, 'Lập trình Android', 2, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(8, 'Laravel Framework', 1, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(9, 'Thiết kế Web với Figma', 3, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(10, 'AI cho người mới bắt đầu', 4, 0, '2025-06-22 20:58:25', '2025-06-22 20:58:25'),
(11, 'HTML & CSS cơ bản', 1, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(12, 'JavaScript nâng cao', 1, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(13, 'iOS SwiftUI', 2, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(14, 'Thiết kế App Mobile', 3, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(15, 'Data Visualization', 4, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(16, 'Xử lý ngôn ngữ tự nhiên', 5, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(17, 'Deep Learning', 5, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(18, 'Photoshop cho Web', 3, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(19, 'Tư duy thiết kế (Design Thinking)', 3, 0, '2025-06-22 20:58:51', '2025-06-22 20:58:51'),
(20, 'Data Engineering', 4, 1, '2025-06-22 20:58:51', '2025-06-22 14:34:17'),
(21, 'Tin học văn phòng', NULL, 1, '2025-06-22 14:00:12', '2025-06-22 21:34:00');

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `certificate_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `user_id`, `course_id`, `issue_date`, `certificate_url`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 26, 42, '2025-06-27', 'http://localhost/E_Learning_/BE_E_Learning/public/storage/certificates/2e59daa1-ccd4-4e74-a5cf-a740cf6e5a4e.pdf', 0, '2025-06-26 23:53:38', '2025-06-26 23:53:38'),
(2, 16, 42, '2025-05-10', 'https://example.com/certificates/cert_001.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(3, 17, 42, '2025-05-11', 'https://example.com/certificates/cert_002.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(4, 18, 42, '2025-05-12', 'https://example.com/certificates/cert_003.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(5, 19, 43, '2025-05-13', 'https://example.com/certificates/cert_004.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(6, 20, 43, '2025-05-14', 'https://example.com/certificates/cert_005.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(7, 21, 44, '2025-05-15', 'https://example.com/certificates/cert_006.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(8, 22, 44, '2025-05-16', 'https://example.com/certificates/cert_007.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(9, 23, 45, '2025-05-17', 'https://example.com/certificates/cert_008.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(10, 26, 45, '2025-05-18', 'https://example.com/certificates/cert_009.pdf', 0, '2025-06-27 06:57:01', '2025-06-27 06:57:01'),
(11, 25, 45, '2025-05-19', 'https://example.com/certificates/cert_010.pdf', 1, '2025-06-27 06:57:01', '2025-06-26 23:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) DEFAULT NULL,
  `instructor_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_general_ci DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `price`, `instructor_id`, `category_id`, `thumbnail`, `status`, `created_at`, `updated_at`, `deleted`) VALUES
(42, 'Lập trình Laravel từ A đến Z', 'Khóa học Laravel đầy đủ, từ cơ bản đến nâng cao.', 499000.00, 1, 8, 'laravel.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(43, 'React JS cho người mới bắt đầu', 'Học React JS qua dự án thực tế.', 399000.00, 3, 6, 'react.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(44, 'Python cơ bản và ứng dụng', 'Nền tảng Python cho người học Data Science.', 349000.00, 4, 4, 'python.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(45, 'Thiết kế UI/UX với Figma', 'Tư duy thiết kế hiện đại với công cụ Figma.', 299000.00, 14, 9, 'figma.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(46, 'SQL & Quản trị dữ liệu', 'MySQL, PostgreSQL và phân tích dữ liệu.', 279000.00, 16, 4, 'sql.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(47, 'Java Spring Boot thực chiến', 'Xây dựng API chuyên nghiệp với Spring Boot.', 459000.00, 17, 1, 'spring.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(48, 'Machine Learning cơ bản', 'Giải thuật ML và ứng dụng với scikit-learn.', 599000.00, 1, 5, 'ml.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(49, 'Javascript nâng cao', 'Closure, Promise, Async/Await & Patterns.', 399000.00, 3, 12, 'javascript.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(50, 'Data Engineering thực chiến', 'Pipeline & xử lý dữ liệu lớn với Airflow.', 579000.00, 4, 20, 'data_eng.png', 'archived', '2025-06-23 08:05:21', '2025-06-23 16:55:04', 0),
(51, 'Tin học văn phòng cơ bản', 'Word, Excel, PowerPoint cho người mới bắt đầu.', 199000.00, 14, 21, 'office.png', 'published', '2025-06-23 08:05:21', '2025-06-23 08:20:12', 0),
(52, 'Khóa học Machine Learning cơ bản', 'Giải thuật ML và ứng dụng với scikit-learn.', 599000.00, 14, 5, 'avatar.png', 'draft', '2025-06-23 01:20:38', '2025-06-23 02:13:51', 1),
(53, 'Khóa học Machine Learning cơ bản', 'Giải thuật ML và ứng dụng với scikit-learn.', 599000.00, 14, 3, NULL, 'published', '2025-06-23 01:27:14', '2025-06-23 16:54:14', 0),
(54, 'Khóa học Machine Learning cơ bản', 'Giải thuật ML và ứng dụng với scikit-learn.', 599000.00, 14, 3, 'avatar.png', 'draft', '2025-06-23 18:02:26', '2025-06-23 18:02:26', 0);

--
-- Triggers `courses`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_courses` AFTER UPDATE ON `courses` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE LESSONS SET deleted = TRUE WHERE course_id = NEW.id;
    UPDATE ENROLLMENTS SET deleted = TRUE WHERE course_id = NEW.id;
    UPDATE REVIEWS SET deleted = TRUE WHERE course_id = NEW.id;
    UPDATE PROGRESS_TRACKING SET deleted = TRUE WHERE course_id = NEW.id;
    UPDATE CERTIFICATES SET deleted = TRUE WHERE course_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `status` enum('active','completed','cancelled') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `status`, `deleted`, `created_at`, `updated_at`) VALUES
(21, 16, 48, 'active', 1, '2025-06-27 06:00:41', '2025-06-26 23:09:19'),
(22, 21, 48, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(23, 23, 42, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(24, 17, 42, 'cancelled', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(25, 25, 43, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(26, 26, 43, 'completed', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(27, 27, 44, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(28, 18, 45, 'completed', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(29, 19, 46, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(30, 20, 47, 'active', 0, '2025-06-27 06:00:41', '2025-06-27 06:00:41'),
(31, 26, 42, 'active', 1, '2025-06-26 23:08:40', '2025-06-26 23:09:43');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `bonus_percent` int DEFAULT '0',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `bio` text COLLATE utf8mb4_general_ci,
  `experience_years` int DEFAULT NULL,
  `linkedin_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `user_id`, `bio`, `experience_years`, `linkedin_url`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 23, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 11, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 15:35:41', '2025-06-21 16:06:34'),
(3, 22, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 10, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 15:36:12', '2025-06-23 09:14:16'),
(4, 20, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 10, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 15:56:57', '2025-06-23 09:14:19'),
(14, 15, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 10, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 17:05:05', '2025-06-21 17:05:05'),
(16, 19, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 10, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 17:09:27', '2025-06-21 17:09:27'),
(17, 18, 'Giảng viên có 10 năm kinh nghiệm về lập trình web.', 10, 'https://linkedin.com/in/nguyenvana', 0, '2025-06-21 18:14:32', '2025-06-21 18:14:32');

--
-- Triggers `instructors`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_instructors` AFTER UPDATE ON `instructors` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE COURSES SET deleted = TRUE WHERE instructor_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `order_number` int DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `course_id`, `title`, `video_url`, `content`, `order_number`, `deleted`, `created_at`, `updated_at`) VALUES
(11, 42, 'Giới thiệu về khóa học', 'https://videos.example.com/intro.mp4', 'Tổng quan khóa học', 1, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(12, 42, 'Cài đặt môi trường Laravel', 'https://videos.example.com/setup.mp4', 'Cài đặt Laravel và môi trường làm việc', 2, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(13, 42, 'Kiến thức cơ bản về route', 'https://videos.example.com/routes.mp4', 'Route trong Laravel', 3, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(14, 42, 'Làm việc với Controller', 'https://videos.example.com/controller.mp4', 'Tạo và xử lý logic trong controller', 4, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(15, 42, 'Tạo và sử dụng View', 'https://videos.example.com/views.mp4', 'Blade và hiển thị dữ liệu', 5, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(16, 43, 'Giới thiệu về ReactJS', 'https://videos.example.com/react-intro.mp4', 'Làm quen với React', 1, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(17, 43, 'Component trong React', 'https://videos.example.com/components.mp4', 'Class vs Function component', 2, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(18, 43, 'Quản lý trạng thái với useState', 'https://videos.example.com/usestate.mp4', 'Hook useState', 3, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(19, 48, 'Tạo project Machine Learning', 'https://videos.example.com/ml-start.mp4', 'Chuẩn bị môi trường Jupyter', 1, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(20, 48, 'Giới thiệu mô hình học sâu', 'https://videos.example.com/deep-intro.mp4', 'Neural network cơ bản', 2, 0, '2025-06-24 06:20:57', '2025-06-24 06:20:57'),
(21, 48, 'Giới thiệu mô hình học sâu', 'https://videos.example.com/deep-intro.mp4', 'Neural network cơ bản test', 3, 1, '2025-06-23 23:29:26', '2025-06-23 23:31:43');

--
-- Triggers `lessons`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_lessons` AFTER UPDATE ON `lessons` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE QUIZZES SET deleted = TRUE WHERE lesson_id = NEW.id;
    UPDATE PROGRESS_TRACKING SET deleted = TRUE WHERE lesson_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci,
  `type` enum('system','course','payment','other') COLLATE utf8mb4_general_ci DEFAULT 'system',
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `voucher_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT '0.00',
  `payment_status` enum('pending','paid','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'wallet',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `type` enum('topup','withdraw') COLLATE utf8mb4_general_ci DEFAULT 'topup',
  `amount` decimal(10,2) DEFAULT NULL,
  `bank_account` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('pending','completed','failed') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_general_ci,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `type`, `amount`, `bank_account`, `status`, `transaction_id`, `note`, `deleted`, `created_at`, `updated_at`) VALUES
(39, 13, 'topup', 200000.00, '', 'completed', '15049316', NULL, 0, '2025-07-01 00:24:24', '2025-07-01 00:24:56');

-- --------------------------------------------------------

--
-- Table structure for table `progress_tracking`
--

CREATE TABLE `progress_tracking` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `lesson_id` int DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progress_tracking`
--

INSERT INTO `progress_tracking` (`id`, `user_id`, `course_id`, `lesson_id`, `is_completed`, `deleted`, `created_at`, `updated_at`) VALUES
(11, 16, 42, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(12, 17, 42, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(13, 21, 42, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(14, 24, 42, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 00:56:09'),
(15, 16, 43, 11, 0, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(16, 17, 43, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(17, 21, 44, 11, 0, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(18, 24, 44, 11, 0, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(19, 16, 45, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(20, 17, 45, 11, 1, 0, '2025-06-26 07:34:56', '2025-06-26 07:34:56'),
(22, 26, 42, 11, 1, 0, '2025-06-26 01:01:52', '2025-06-26 01:04:38');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `question_text` text COLLATE utf8mb4_general_ci,
  `question_type` enum('single','multiple') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_number` int DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `question_text`, `question_type`, `order_number`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'PHP là viết tắt của?', 'single', 2, 0, '2025-06-25 08:01:20', '2025-06-25 01:17:12'),
(2, 1, 'Laravel là gì?', 'single', 2, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(3, 1, 'Lệnh tạo controller trong Laravel?', 'single', 3, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(4, 1, 'Câu lệnh migrate dùng để làm gì?', 'single', 4, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(5, 1, 'Eloquent ORM là gì?', 'single', 5, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(6, 1, 'Route trong Laravel định nghĩa ở đâu?', 'single', 6, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(7, 1, 'Middleware dùng để?', 'single', 7, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(8, 1, 'Tập tin cấu hình Laravel nằm ở thư mục nào?', 'single', 8, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(9, 1, 'Helper trong Laravel là?', 'single', 9, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(10, 1, 'Composer dùng để?', 'single', 10, 0, '2025-06-25 08:01:20', '2025-06-25 08:01:20'),
(13, 2, 'PHP là viết tắt của?', 'single', 1, 1, '2025-06-25 01:14:10', '2025-06-25 01:15:03');

--
-- Triggers `questions`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_questions` AFTER UPDATE ON `questions` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE ANSWERS SET deleted = TRUE WHERE question_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int NOT NULL,
  `lesson_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `lesson_id`, `title`, `description`, `deleted`, `created_at`, `updated_at`) VALUES
(1, 11, 'Quiz: Giới thiệu Laravel', 'Kiểm tra kiến thức cơ bản về Laravel. test', 1, '2025-06-24 07:50:54', '2025-06-24 01:53:44'),
(2, 11, 'Quiz: Cấu trúc project Laravel', 'Tìm hiểu cấu trúc thư mục của Laravel.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(3, 12, 'Quiz: Routing nâng cao', 'Kiểm tra hiểu biết về route và controller.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(4, 12, 'Quiz: Middleware & Auth', 'Câu hỏi về xác thực và bảo mật.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(5, 13, 'Quiz: Blade Template', 'Đánh giá hiểu biết về Blade.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(6, 13, 'Quiz: View Components', 'Sử dụng view component trong Blade.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(7, 14, 'Quiz: React Basics', 'Kiểm tra kiến thức cơ bản về React.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(8, 14, 'Quiz: State & Props', 'Hiểu về quản lý state trong React.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(9, 15, 'Quiz: AI Fundamentals', 'Các khái niệm cơ bản về trí tuệ nhân tạo.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(10, 15, 'Quiz: Machine Learning Types', 'Phân biệt supervised, unsupervised, reinforcement.', 0, '2025-06-24 07:50:54', '2025-06-24 07:50:54'),
(11, 11, 'Quiz: Giới thiệu Laravel', 'Kiểm tra kiến thức cơ bản về Laravel.', 0, '2025-06-24 01:53:36', '2025-06-24 01:53:36');

--
-- Triggers `quizzes`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_quizzes` AFTER UPDATE ON `quizzes` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE QUESTIONS SET deleted = TRUE WHERE quiz_id = NEW.id;
    UPDATE result_quizzes SET deleted = TRUE WHERE quiz_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `result_answers`
--

CREATE TABLE `result_answers` (
  `id` int NOT NULL,
  `result_quiz_id` int NOT NULL,
  `question_id` int NOT NULL,
  `selected_answer_id` int DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `result_quizzes`
--

CREATE TABLE `result_quizzes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `total_questions` int DEFAULT NULL,
  `correct_answers` int DEFAULT NULL,
  `is_pass` tinyint(1) DEFAULT '0',
  `submitted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `result_quizzes`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_result_quiz` AFTER UPDATE ON `result_quizzes` FOR EACH ROW BEGIN
    IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
        UPDATE result_answers
        SET deleted = TRUE
        WHERE result_quiz_id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0'
) ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `course_id`, `rating`, `comment`, `created_at`, `updated_at`, `deleted`) VALUES
(41, 16, 42, 3, 'Khóa học tuyệt vời, giảng viên dễ hiểu.', '2025-06-26 07:39:03', '2025-06-26 01:07:06', 0),
(42, 21, 42, 4, 'Nội dung tốt, cần thêm ví dụ thực tế.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(43, 27, 43, 5, 'Rất hữu ích cho người mới bắt đầu.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(44, 17, 43, 3, 'Khóa học ổn, nhưng video hơi mờ.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(45, 25, 43, 5, 'Thầy dạy rất nhiệt tình, chi tiết.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(46, 26, 44, 4, 'Nên có thêm phần bài tập thực hành.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(47, 16, 45, 5, 'Rất tuyệt vời! Học xong làm được luôn.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(48, 27, 42, 4, 'Tạm ổn, nội dung hơi ngắn.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(49, 25, 45, 5, 'Đáng giá từng đồng!', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(50, 17, 44, 4, 'Phần lý thuyết dễ hiểu, demo tốt.', '2025-06-26 07:39:03', '2025-06-26 07:39:03', 0),
(51, 26, 42, 5, 'Khóa học tuyệt vời, giảng viên dễ hiểu.', '2025-06-26 01:06:13', '2025-06-26 01:06:13', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa1iD6T.4Oii4oXy4eF2vY5O8v6',
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `role` enum('student','instructor','admin') COLLATE utf8mb4_general_ci DEFAULT 'student',
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive','banned') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `money` decimal(12,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `gender`, `date_of_birth`, `role`, `avatar`, `created_at`, `updated_at`, `deleted`, `status`, `money`) VALUES
(13, 'example1234', 'diennhue111@gmail.com', '$2y$12$jspBiYRudAJUTnBa/P0sK.2MCTwv7jyutpqD6H9YQYJrIsxV8RRqu', NULL, NULL, NULL, 'admin', NULL, '2025-06-19 15:29:39', '2025-07-01 00:24:56', 0, 'active', 200000.00),
(14, 'example1234', 'example32@gmail.com', '$2y$12$qRh8eC0Jhyk.9AtYSBwvlue25fEzzYmTpnlPuZmWDwZTi4wQqNKuW', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:31:19', '2025-06-19 15:31:19', 0, 'active', 0.00),
(15, 'example1234', 'example321@gmail.com', '$2y$12$diDRZPYSavScXqfPjVThVunSeOlINpdJf8TwO9wmITX97iYvskIYe', NULL, NULL, NULL, 'instructor', NULL, '2025-06-19 15:31:32', '2025-06-21 17:05:05', 0, 'active', 0.00),
(16, 'example1234', 'example3211@gmail.com', '$2y$12$FyLL.nFCx6WESQij0YdXs.fmlUh/U5vpC5uJukf0s9W4ZZlemd292', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:31:55', '2025-06-19 15:31:55', 0, 'active', 0.00),
(17, 'example1234', 'example32121@gmail.com', '$2y$12$7AurfVgYTojDCEHDCHW98.7cMWytCnKAor/GbZARQJoZ4Z.gpeh7q', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:33:18', '2025-06-19 15:33:18', 0, 'active', 0.00),
(18, 'example1234', 'example321121@gmail.com', '$2y$12$n6TjudkE19icuGg1nwsDCeSVYYc9cNvS5R5E9rZeE.QeFuE8i6fsS', NULL, NULL, NULL, 'instructor', NULL, '2025-06-19 15:34:45', '2025-06-26 07:31:27', 0, 'active', 0.00),
(19, 'example1234', 'example3211211@gmail.com', '$2y$12$YBEv/XEJpn3YGd4APMZ4LuTCRh3Vr5mWRKJ1IZgO.y6AzCpYKi.ri', NULL, NULL, NULL, 'instructor', NULL, '2025-06-19 15:35:54', '2025-06-21 17:09:27', 0, 'active', 0.00),
(20, 'example1234', 'example32111211@gmail.com', '$2y$12$Q8L7BV.S43G5eQwOlIsBXucVj1AwgDPWBXodZp0V.WTx4h5asjQRC', NULL, NULL, NULL, 'instructor', NULL, '2025-06-19 15:38:39', '2025-06-21 15:56:57', 0, 'active', 0.00),
(21, 'example1234', 'example321111211@gmail.com', '$2y$12$1PkGFFWza1CzYtJmO1VSBuGDkY9/ufVb4NiYzlTJ9LWmBdxb/2S9C', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:41:16', '2025-06-19 15:41:16', 0, 'active', 0.00),
(22, 'example1234', 'example3211111211@gmail.com', '$2y$12$M83AFVgkzk9Ermb4r/1EYOCLY6lWia5mzYfvPT9j0YoWvLmYsSZxS', NULL, NULL, NULL, 'instructor', NULL, '2025-06-19 15:41:44', '2025-06-21 15:36:12', 0, 'active', 0.00),
(23, 'example1234', 'example32111111211@gmail.com', '$2y$12$XsnwJP1qPRGPByYFARMGdOwCGPYFwkZjK80l8t6ihls784SjDjCM2', '0998283112', 'male', '2000-08-21', 'instructor', NULL, '2025-06-19 15:45:52', '2025-06-20 16:55:40', 0, 'active', 0.00),
(24, 'example1234', 'example321311211@gmail.com', '$2y$12$vgjm3qiXACcC3eXOLNUDp.ONeeOq41GCa9pXFxDota07rUnN8Y6SG', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:46:09', '2025-06-20 16:16:16', 1, 'active', 0.00),
(25, 'example1234', 'example3213111211@gmail.com', '$2y$12$FvUeLgQXdcMYihg/7bApoefBjBycsJ6/3U/jd6YtjNpNZWNuVYRSa', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:47:10', '2025-06-19 15:47:10', 0, 'active', 0.00),
(26, 'example1234', 'example321112311111211@gmail.com', '$2y$12$HUrwReCtXBKXP8zzHJtGtuqL3zGCj8L5iA2E3O5EEYn8sbLkJLM0G', NULL, NULL, NULL, 'student', NULL, '2025-06-19 15:56:58', '2025-06-20 16:26:08', 0, 'active', 0.00),
(27, 'hương', 'huongw12@gmail.com', '123456', NULL, 'female', NULL, 'student', NULL, '2025-06-20 17:05:32', '2025-06-20 17:05:32', 0, 'active', 0.00),
(28, 'hương', 'h@gmail.com', '123456', NULL, 'female', NULL, 'student', NULL, '2025-06-20 17:07:26', '2025-06-20 17:07:26', 0, 'active', 0.00);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `trg_soft_delete_users` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    UPDATE INSTRUCTORS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE ENROLLMENTS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE PAYMENTS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE REVIEWS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE PROGRESS_TRACKING SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE CERTIFICATES SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE AI_RECOMMENDATIONS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE ORDERS SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE notifications SET deleted = TRUE WHERE user_id = NEW.id;
    UPDATE result_quizzes SET deleted = TRUE WHERE user_id = NEW.id;
  END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ai_recommendations`
--
ALTER TABLE `ai_recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `progress_tracking`
--
ALTER TABLE `progress_tracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Indexes for table `result_answers`
--
ALTER TABLE `result_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `result_answers_ibfk_1` (`result_quiz_id`),
  ADD KEY `result_answers_ibfk_2` (`question_id`),
  ADD KEY `result_answers_ibfk_3` (`selected_answer_id`);

--
-- Indexes for table `result_quizzes`
--
ALTER TABLE `result_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ai_recommendations`
--
ALTER TABLE `ai_recommendations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `progress_tracking`
--
ALTER TABLE `progress_tracking`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `result_answers`
--
ALTER TABLE `result_answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `result_quizzes`
--
ALTER TABLE `result_quizzes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ai_recommendations`
--
ALTER TABLE `ai_recommendations`
  ADD CONSTRAINT `ai_recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `instructors`
--
ALTER TABLE `instructors`
  ADD CONSTRAINT `instructors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `progress_tracking`
--
ALTER TABLE `progress_tracking`
  ADD CONSTRAINT `progress_tracking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `progress_tracking_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `progress_tracking_ibfk_3` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `result_answers`
--
ALTER TABLE `result_answers`
  ADD CONSTRAINT `result_answers_ibfk_1` FOREIGN KEY (`result_quiz_id`) REFERENCES `result_quizzes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `result_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `result_answers_ibfk_3` FOREIGN KEY (`selected_answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `result_quizzes`
--
ALTER TABLE `result_quizzes`
  ADD CONSTRAINT `result_quizzes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `result_quizzes_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
