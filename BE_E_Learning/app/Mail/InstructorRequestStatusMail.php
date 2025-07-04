<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class InstructorRequestStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $messageText;

    public function __construct(string $messageText)
    {
        $this->messageText = $messageText;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Thông báo yêu cầu trở thành giảng viên',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.instructor_request_status',
            with: [
                'messageText' => $this->messageText, 
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
