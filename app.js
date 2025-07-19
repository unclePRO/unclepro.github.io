// PATCH: add listener to upgrade-now-btn at setupPremiumButton() bottom
        const upgradeNow = document.getElementById('upgrade-now-btn');
        if (upgradeNow) {
            upgradeNow.addEventListener('click', (e) => {
                e.preventDefault();
                this.createFlameExplosion(upgradeNow);
                this.showPremiumModal();
            });
        }