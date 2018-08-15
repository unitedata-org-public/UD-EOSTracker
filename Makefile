build:
	rm -rf dist
	npm run build
	docker build -t dockerhub.test.wacai.info/lufeng/eos-tracker:`git rev-parse --short HEAD` .
	docker build -t dockerhub.test.wacai.info/lufeng/eos-tracker:latest .

push:
	docker push dockerhub.test.wacai.info/lufeng/eos-tracker:`git rev-parse --short HEAD`
	docker push dockerhub.test.wacai.info/lufeng/eos-tracker:latest
