FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app

# Copy current directory contents into container at /app
ADD . /app

# Install the dependencies
RUN pip install -r requirements.txt

CMD ["uvicorn", "app.route:app", "--host", "0.0.0.0", "--port", "8906"]