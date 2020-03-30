FROM continuumio/anaconda3:2020.02

RUN pip install --upgrade pip && \
    pip install autopep8

WORKDIR /app
EXPOSE 8888
ENTRYPOINT ["jupyter-lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.token=''"]
CMD ["--notebook-dir=/app"]
