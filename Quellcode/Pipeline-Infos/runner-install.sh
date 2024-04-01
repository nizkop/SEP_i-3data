# 2023.04.12 -- Software Entwicklung & Programmierung
# Copyright (c) 2023 Patrick Mang. All Rights Reserved.

echo ":: Removing existing docker installation"

# https://docs.docker.com/engine/install/ubuntu/
sudo apt-get --yes --force-yes remove \
	containerd \
	docker \
	docker-engine \
	docker.io \
	runc

echo ":: Installing docker"

sudo apt-get --yes --force-yes update
sudo apt-get --yes --force-yes install \
    ca-certificates \
    curl \
    gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list

sudo apt-get --yes --force-yes update
sudo apt-get --yes --force-yes install \
	containerd.io \
	docker-buildx-plugin \
	docker-ce \
	docker-ce-cli \
	docker-compose-plugin

# enable docker service
sudo systemctl enable --now docker.service

echo ":: docker installed"

echo ":: Installing gitlab-runner"

# https://docs.gitlab.com/runner/install/linux-repository.html
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt-get --yes --force-yes install gitlab-runner

# enable gitlab runner service
sudo systemctl enable --now gitlab-runner.service

while true; do
	read -p "GitLab-Runner registration token: " token < /dev/tty
	if [ ${#token} -gt 10 ] && [ ${#token} -lt 50 ]; then
		break
	else
		echo "Invalid token"
	fi
done

# gitlab-runner register --help
sudo gitlab-runner register \
	--description "vm-runner" \
	--docker-image "alpine:3.17" \
	--docker-privileged \
	--executor "docker" \
	--maintenance-note "" \
	--non-interactive \
	--registration-token "${token}" \
	--tag-list "" \
	--url "https://git.uni-due.de/"

# restart gitlab runner service
sudo systemctl restart gitlab-runner.service

echo ":: gitlab-runner installed"

echo ":: Done"
