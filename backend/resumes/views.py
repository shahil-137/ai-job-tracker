from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from pypdf import PdfReader

from .models import Resume
from .serializers import ResumeSerializer


class ResumeListCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)

        # Extract text from the uploaded PDF
        reader = PdfReader(resume.file.path)

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        # Save the extracted text
        resume.extracted_text = text
        resume.save()


class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)