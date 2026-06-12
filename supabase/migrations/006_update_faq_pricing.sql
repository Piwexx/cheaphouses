update faqs
set answer = replace(answer, '$15/month month-to-month', '$12/month month-to-month')
where question = 'Is it free?';
