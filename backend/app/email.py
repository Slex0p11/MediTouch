from django.core.mail import EmailMessage,EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def send_doctor_approval_email(doctor_email, doctor_name):
    subject = 'Your Doctor Account Has Been Approved'
    
    # You can create an HTML template in templates/emails/doctor_approval.html
    message = render_to_string('emails/doctor_approval.html', {
        'doctor_name': doctor_name,
    })
    
    email = EmailMessage(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [doctor_email],
    )
    email.content_subtype = 'html'  # Main content is now text/html
    email.send()

def send_doctor_rejection_email(doctor_email, doctor_name, rejection_reason):
    subject = 'Your Doctor Registration Status Update'
    
    html_content = render_to_string('emails/doctor_rejection.html', {
        'doctor_name': doctor_name,
        'rejection_reason': rejection_reason
    })
    
    text_content = f"""
    Dear Dr. {doctor_name},
    
    We regret to inform you that your registration could not be approved.
    
    Reason for rejection:
    {rejection_reason}
    
    You may correct these issues and submit a new application if eligible.
    
    Best regards,
    The Healthcare Team
    """
    
    email = EmailMultiAlternatives(
        subject,
        text_content,
        settings.DEFAULT_FROM_EMAIL,
        [doctor_email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()