// Advanced Power-up System for Bunny Hop Game
// Features: Rarity system, combinations, upgrades, and strategic gameplay

class PowerUpManager {
    constructor(scene) {
        this.scene = scene;
        this.activePowerUps = new Map();
        this.powerUpHistory = [];
        this.comboMultiplier = 1;
        this.lastPowerUpTime = 0;
        
        // Enhanced power-up types with rarity and logic
        this.powerUpTypes = {
            DOUBLE_JUMP: 'doubleJump',
            SPEED_BOOST: 'speedBoost', 
            SHIELD: 'shield',
            MAGNET: 'magnet',
            TIME_SLOW: 'timeSlow',
            GRAVITY_REVERSE: 'gravityReverse',
            TELEPORT: 'teleport',
            MULTI_COLLECT: 'multiCollect',
            INVINCIBILITY: 'invincibility',
            WALL_JUMP: 'wallJump',
            DASH: 'dash',
            BOUNCE: 'bounce',
            PHASE_THROUGH: 'phaseThrough',
            CARROT_RAIN: 'carrotRain',
            TIME_FREEZE: 'timeFreeze',
            GHOST_MODE: 'ghostMode',
            SUPER_JUMP: 'superJump'
        };
        
        // Advanced power-up configurations with rarity and effects
        this.powerUpConfig = {
            doubleJump: {
                name: 'Double Jump',
                rarity: 'common', // 30% chance
                weight: 30,
                duration: 12000, // 12 seconds
                color: 0x00FFFF,
                icon: '🔄',
                effect: 'Double Jump Active!',
                description: 'Jump again in mid-air',
                maxStacks: 3,
                upgradeEffect: 'Increases jump height'
            },
            speedBoost: {
                name: 'Speed Boost',
                rarity: 'common', // 25% chance
                weight: 25,
                duration: 8000, // 8 seconds
                color: 0xFF6B35,
                icon: '⚡',
                effect: 'Speed Boost!',
                description: 'Move 50% faster',
                maxStacks: 2,
                upgradeEffect: 'Increases speed multiplier'
            },
            shield: {
                name: 'Shield',
                rarity: 'uncommon', // 20% chance
                weight: 20,
                duration: 15000, // 15 seconds
                color: 0x4ECDC4,
                icon: '🛡️',
                effect: 'Shield Active!',
                description: 'Protection from obstacles',
                maxStacks: 1,
                upgradeEffect: 'Longer duration'
            },
            magnet: {
                name: 'Magnet',
                rarity: 'uncommon', // 15% chance
                weight: 15,
                duration: 10000, // 10 seconds
                color: 0xFFD93D,
                icon: '🧲',
                effect: 'Magnet Active!',
                description: 'Attract carrots and power-ups',
                maxStacks: 2,
                upgradeEffect: 'Increased attraction range'
            },
            timeSlow: {
                name: 'Time Slow',
                rarity: 'rare', // 5% chance
                weight: 5,
                duration: 6000, // 6 seconds
                color: 0x9B59B6,
                icon: '⏰',
                effect: 'Time Slow!',
                description: 'Slow down obstacles',
                maxStacks: 1,
                upgradeEffect: 'Longer slow duration'
            },
            gravityReverse: {
                name: 'Gravity Reverse',
                rarity: 'rare', // 3% chance
                weight: 3,
                duration: 5000, // 5 seconds
                color: 0xE74C3C,
                icon: '🔄',
                effect: 'Gravity Reversed!',
                description: 'Float upward',
                maxStacks: 1,
                upgradeEffect: 'Stronger upward force'
            },
            teleport: {
                name: 'Teleport',
                rarity: 'epic', // 1% chance
                weight: 1,
                duration: 0, // Instant use
                color: 0x3498DB,
                icon: '✨',
                effect: 'Teleport!',
                description: 'Instantly move forward',
                maxStacks: 1,
                upgradeEffect: 'Longer teleport distance'
            },
            multiCollect: {
                name: 'Multi Collect',
                rarity: 'epic', // 1% chance
                weight: 1,
                duration: 8000, // 8 seconds
                color: 0xF39C12,
                icon: '🌟',
                effect: 'Multi Collect!',
                description: 'Collect multiple items at once',
                maxStacks: 1,
                upgradeEffect: 'Larger collection radius'
            },
            invincibility: {
                name: 'Invincibility',
                rarity: 'rare', // 4% chance
                weight: 4,
                duration: 10000, // 10 seconds
                color: 0xFFD700,
                icon: '💫',
                effect: 'Invincible!',
                description: 'Cannot be harmed',
                maxStacks: 1,
                upgradeEffect: 'Longer duration'
            },
            wallJump: {
                name: 'Wall Jump',
                rarity: 'uncommon', // 12% chance
                weight: 12,
                duration: 15000, // 15 seconds
                color: 0x8E44AD,
                icon: '🏃',
                effect: 'Wall Jump!',
                description: 'Jump off walls',
                maxStacks: 2,
                upgradeEffect: 'More wall jumps'
            },
            dash: {
                name: 'Dash',
                rarity: 'common', // 18% chance
                weight: 18,
                duration: 6000, // 6 seconds
                color: 0xE67E22,
                icon: '💨',
                effect: 'Dash!',
                description: 'Quick forward burst',
                maxStacks: 2,
                upgradeEffect: 'Longer dash distance'
            },
            bounce: {
                name: 'Bounce',
                rarity: 'uncommon', // 10% chance
                weight: 10,
                duration: 12000, // 12 seconds
                color: 0x2ECC71,
                icon: '⚽',
                effect: 'Bounce!',
                description: 'Bounce higher off surfaces',
                maxStacks: 2,
                upgradeEffect: 'Higher bounce'
            },
            phaseThrough: {
                name: 'Phase Through',
                rarity: 'rare', // 3% chance
                weight: 3,
                duration: 8000, // 8 seconds
                color: 0x9B59B6,
                icon: '👻',
                effect: 'Phase Through!',
                description: 'Pass through obstacles',
                maxStacks: 1,
                upgradeEffect: 'Longer duration'
            },
            carrotRain: {
                name: 'Carrot Rain',
                rarity: 'epic', // 1% chance
                weight: 1,
                duration: 0, // Instant effect
                color: 0xFF8C00,
                icon: '🥕',
                effect: 'Carrot Rain!',
                description: 'Spawn many carrots',
                maxStacks: 1,
                upgradeEffect: 'More carrots'
            },
            timeFreeze: {
                name: 'Time Freeze',
                rarity: 'legendary', // 0.5% chance
                weight: 0.5,
                duration: 4000, // 4 seconds
                color: 0x00CED1,
                icon: '❄️',
                effect: 'Time Frozen!',
                description: 'Freeze everything',
                maxStacks: 1,
                upgradeEffect: 'Longer freeze'
            },
            ghostMode: {
                name: 'Ghost Mode',
                rarity: 'rare', // 2% chance
                weight: 2,
                duration: 10000, // 10 seconds
                color: 0x95A5A6,
                icon: '👻',
                effect: 'Ghost Mode!',
                description: 'Float through everything',
                maxStacks: 1,
                upgradeEffect: 'Longer duration'
            },
            superJump: {
                name: 'Super Jump',
                rarity: 'uncommon', // 8% chance
                weight: 8,
                duration: 12000, // 12 seconds
                color: 0xE74C3C,
                icon: '🚀',
                effect: 'Super Jump!',
                description: 'Extremely high jumps',
                maxStacks: 2,
                upgradeEffect: 'Even higher jumps'
            }
        };
        
        this.initializePowerUpSystem();
    }
    
    initializePowerUpSystem() {
        // Dynamic spawn timer based on game state
        this.updateSpawnTimer();
        
        // Create enhanced UI
        this.createAdvancedPowerUpUI();
        
        // Initialize combo system
        this.comboTimer = null;
        this.comboCount = 0;
    }
    
    updateSpawnTimer() {
        // Remove existing timer
        if (this.spawnTimer) {
            this.scene.time.removeEvent(this.spawnTimer);
        }
        
        // Calculate spawn delay based on game state
        const baseDelay = 12000; // 12 seconds base
        const difficultyFactor = Math.max(0.5, 1 - (this.scene.score / 10000)); // Faster spawning at higher scores
        const spawnDelay = baseDelay * difficultyFactor;
        
        this.spawnTimer = this.scene.time.addEvent({
            delay: spawnDelay,
            callback: this.spawnPowerUp,
            callbackScope: this,
            loop: true
        });
    }
    
    createAdvancedPowerUpUI() {
        // Main power-up display
        this.powerUpUI = this.scene.add.container(650, 50);
        this.powerUpUI.setDepth(100);
        
        // Active power-ups display
        this.activePowerUpsText = this.scene.add.text(0, 0, '', {
            fontSize: '14px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 2
        });
        this.powerUpUI.add(this.activePowerUpsText);
        
        // Combo display
        this.comboText = this.scene.add.text(0, 80, '', {
            fontSize: '16px',
            fill: '#FFD700',
            stroke: '#000',
            strokeThickness: 2
        });
        this.powerUpUI.add(this.comboText);
        
        // Power-up history
        this.historyText = this.scene.add.text(0, 120, '', {
            fontSize: '12px',
            fill: '#ccc',
            stroke: '#000',
            strokeThickness: 1
        });
        this.powerUpUI.add(this.historyText);
    }
    
    spawnPowerUp() {
        if (this.scene.isPaused) return;
        
        // Weighted random selection based on rarity
        const selectedType = this.selectPowerUpByRarity();
        const config = this.powerUpConfig[selectedType];
        
        console.log('Spawning power-up:', selectedType, 'Rarity:', config.rarity);
        
        const powerUp = this.scene.add.container(850, Phaser.Math.Between(200, 400));
        
        // Create enhanced power-up graphics
        this.createPowerUpGraphics(powerUp, config);
        
        // Add physics
        powerUp.setSize(60, 60);
        this.scene.physics.add.existing(powerUp);
        powerUp.body.setVelocityX(-200);
        powerUp.body.setAllowGravity(false);
        
        // Add rarity-based effects
        this.addPowerUpEffects(powerUp, config);
        
        // Collision detection
        this.scene.physics.add.overlap(this.scene.bunny, powerUp, () => {
            this.collectPowerUp(selectedType, powerUp);
        }, null, this.scene);
        
        // Auto-destroy after 10 seconds
        this.scene.time.addEvent({
            delay: 10000,
            callback: () => {
                if (powerUp && powerUp.active) {
                    powerUp.destroy();
                }
            }
        });
    }
    
    selectPowerUpByRarity() {
        const totalWeight = Object.values(this.powerUpConfig).reduce((sum, config) => sum + config.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const [type, config] of Object.entries(this.powerUpConfig)) {
            random -= config.weight;
            if (random <= 0) {
                return type;
            }
        }
        
        return 'doubleJump'; // Fallback
    }
    
    createPowerUpGraphics(powerUp, config) {
        const powerUpGraphics = this.scene.add.graphics();
        
        // Rarity-based glow effect
        const glowIntensity = this.getRarityGlow(config.rarity);
        const glowColor = this.getRarityColor(config.rarity);
        
        // Outer glow
        powerUpGraphics.fillStyle(glowColor, glowIntensity * 0.3);
        powerUpGraphics.fillCircle(0, 0, 35);
        
        // Main power-up color
        powerUpGraphics.fillStyle(config.color, 0.8);
        powerUpGraphics.fillCircle(0, 0, 25);
        
        // Inner highlight
        powerUpGraphics.fillStyle(0xFFFFFF, 1);
        powerUpGraphics.fillCircle(0, 0, 20);
        
        // Add icon with rarity border
        const iconText = this.scene.add.text(0, 0, config.icon, {
            fontSize: '24px',
            fill: '#000',
            stroke: glowColor,
            strokeThickness: 3
        }).setOrigin(0.5);
        
        powerUp.add([powerUpGraphics, iconText]);
    }
    
    getRarityGlow(rarity) {
        const glowMap = {
            'common': 0.5,
            'uncommon': 0.7,
            'rare': 0.9,
            'epic': 1.0,
            'legendary': 1.2
        };
        return glowMap[rarity] || 0.5;
    }
    
    getRarityColor(rarity) {
        const colorMap = {
            'common': 0xFFFFFF,
            'uncommon': 0x00FF00,
            'rare': 0x0080FF,
            'epic': 0xFF00FF,
            'legendary': 0xFFD700
        };
        return colorMap[rarity] || 0xFFFFFF;
    }
    
    addPowerUpEffects(powerUp, config) {
        // Rarity-based animations
        const pulseSpeed = this.getRarityPulseSpeed(config.rarity);
        
        // Pulsing animation
        this.scene.tweens.add({
            targets: powerUp,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: pulseSpeed,
            yoyo: true,
            repeat: -1
        });
        
        // Rotation based on rarity
        const rotationSpeed = this.getRarityRotationSpeed(config.rarity);
        this.scene.tweens.add({
            targets: powerUp,
            angle: 360,
            duration: rotationSpeed,
            repeat: -1
        });
        
        // Floating animation
        this.scene.tweens.add({
            targets: powerUp,
            y: powerUp.y + 10,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
    
    getRarityPulseSpeed(rarity) {
        const speedMap = {
            'common': 800,
            'uncommon': 600,
            'rare': 400,
            'epic': 300,
            'legendary': 200
        };
        return speedMap[rarity] || 800;
    }
    
    getRarityRotationSpeed(rarity) {
        const speedMap = {
            'common': 4000,
            'uncommon': 3000,
            'rare': 2000,
            'epic': 1500,
            'legendary': 1000
        };
        return speedMap[rarity] || 4000;
    }
    
    collectPowerUp(type, powerUp) {
        const config = this.powerUpConfig[type];
        
        console.log('Collecting power-up:', type, 'Rarity:', config.rarity);
        
        // Add to history
        this.powerUpHistory.push({
            type: type,
            time: this.scene.time.now,
            rarity: config.rarity
        });
        
        // Keep only last 10 power-ups
        if (this.powerUpHistory.length > 10) {
            this.powerUpHistory.shift();
        }
        
        // Handle instant power-ups
        if (config.duration === 0) {
            this.activateInstantPowerUp(type);
            powerUp.destroy();
            return;
        }
        
        // Check if power-up can be stacked
        const currentStacks = this.activePowerUps.get(type)?.stacks || 0;
        if (currentStacks >= config.maxStacks) {
            // Upgrade existing power-up
            this.upgradePowerUp(type);
        } else {
            // Activate new power-up
            this.activatePowerUp(type);
        }
        
        // Update combo system
        this.updateCombo();
        
        // Show collection effect
        this.showCollectionEffect(powerUp, config);
        
        powerUp.destroy();
    }
    
    activateInstantPowerUp(type) {
        switch(type) {
            case this.powerUpTypes.TELEPORT:
                this.performTeleport();
                break;
            case this.powerUpTypes.CARROT_RAIN:
                this.activateCarrotRain();
                break;
        }
    }
    
    performTeleport() {
        // Teleport bunny forward
        const teleportDistance = 200;
        this.scene.bunny.x += teleportDistance;
        
        // Teleport effect
        this.showTeleportEffect();
        
        // Update score
        this.scene.score += 500;
        this.scene.scoreText.setText('Score: ' + Math.floor(this.scene.score));
    }
    
    showTeleportEffect() {
        // Create teleport particles
        for (let i = 0; i < 20; i++) {
            const particle = this.scene.add.circle(
                this.scene.bunny.x + Phaser.Math.Between(-50, 50),
                this.scene.bunny.y + Phaser.Math.Between(-50, 50),
                3,
                0x3498DB,
                0.8
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: this.scene.bunny.x + Phaser.Math.Between(-100, 100),
                y: this.scene.bunny.y + Phaser.Math.Between(-100, 100),
                alpha: 0,
                duration: 500,
                onComplete: () => particle.destroy()
            });
        }
    }
    
    upgradePowerUp(type) {
        const powerUp = this.activePowerUps.get(type);
        if (!powerUp) return;
        
        const config = this.powerUpConfig[type];
        powerUp.stacks++;
        
        // Extend duration
        this.scene.time.removeEvent(powerUp.timer);
        const extendedDuration = config.duration * (1 + powerUp.stacks * 0.5);
        
        powerUp.timer = this.scene.time.addEvent({
            delay: extendedDuration,
            callback: () => {
                this.applyPowerUpEffect(type, false);
                this.activePowerUps.delete(type);
                this.updatePowerUpUI();
            }
        });
        
        // Show upgrade effect
        this.showUpgradeEffect(config);
    }
    
    updateCombo() {
        const now = this.scene.time.now;
        
        // Reset combo if too much time has passed
        if (now - this.lastPowerUpTime > 5000) {
            this.comboCount = 0;
        }
        
        this.comboCount++;
        this.lastPowerUpTime = now;
        
        // Calculate combo multiplier
        this.comboMultiplier = Math.min(3, 1 + this.comboCount * 0.2);
        
        // Show combo effect
        if (this.comboCount > 1) {
            this.showComboEffect();
        }
        
        // Update combo timer
        if (this.comboTimer) {
            this.scene.time.removeEvent(this.comboTimer);
        }
        
        this.comboTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.comboCount = 0;
                this.comboMultiplier = 1;
                this.updateComboUI();
            }
        });
        
        this.updateComboUI();
    }
    
    showComboEffect() {
        const comboText = this.scene.add.text(400, 200, `COMBO x${this.comboMultiplier.toFixed(1)}!`, {
            fontSize: '32px',
            fill: '#FFD700',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(1000);
        
        this.scene.tweens.add({
            targets: comboText,
            y: comboText.y - 50,
            alpha: 0,
            scale: 1.5,
            duration: 1500,
            onComplete: () => comboText.destroy()
        });
    }
    
    showCollectionEffect(powerUp, config) {
        // Create collection particles
        for (let i = 0; i < 15; i++) {
            const particle = this.scene.add.circle(
                powerUp.x + Phaser.Math.Between(-20, 20),
                powerUp.y + Phaser.Math.Between(-20, 20),
                3,
                config.color,
                0.8
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: this.scene.bunny.x + Phaser.Math.Between(-10, 10),
                y: this.scene.bunny.y + Phaser.Math.Between(-10, 10),
                alpha: 0,
                duration: 400,
                onComplete: () => particle.destroy()
            });
        }
        
        // Screen shake for rare+ power-ups
        if (config.rarity !== 'common') {
            this.scene.cameras.main.shake(200, 0.02);
        }
    }
    
    showUpgradeEffect(config) {
        const upgradeText = this.scene.add.text(400, 250, `${config.name} Upgraded!`, {
            fontSize: '24px',
            fill: '#FFD700',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(1000);
        
        this.scene.tweens.add({
            targets: upgradeText,
            y: upgradeText.y - 30,
            alpha: 0,
            duration: 1000,
            onComplete: () => upgradeText.destroy()
        });
    }
    
    activatePowerUp(type) {
        const config = this.powerUpConfig[type];
        
        console.log('Activating power-up:', type);
        
        // Cancel existing power-up of same type
        if (this.activePowerUps.has(type)) {
            this.scene.time.removeEvent(this.activePowerUps.get(type).timer);
        }
        
        // Apply power-up effect
        this.applyPowerUpEffect(type, true);
        
        // Create timer for power-up duration
        const timer = this.scene.time.addEvent({
            delay: config.duration,
            callback: () => {
                this.applyPowerUpEffect(type, false);
                this.activePowerUps.delete(type);
                this.updatePowerUpUI();
            }
        });
        
        // Store active power-up with stack info
        this.activePowerUps.set(type, {
            timer: timer,
            startTime: this.scene.time.now,
            stacks: 1
        });
        
        // Show activation effect
        this.showPowerUpEffect(config.effect, config.color);
        
        // Update UI
        this.updatePowerUpUI();
    }
    
    applyPowerUpEffect(type, activate) {
        switch(type) {
            case this.powerUpTypes.DOUBLE_JUMP:
                this.scene.hasDoubleJump = activate;
                if (activate) this.scene.doubleJumpCount = 0;
                break;
                
            case this.powerUpTypes.SPEED_BOOST:
                if (activate) {
                    this.scene.originalSpeed = this.scene.speed;
                    this.scene.speed *= 1.5;
                    this.createSpeedBoostEffect();
                } else {
                    this.scene.speed = this.scene.originalSpeed;
                    this.removeSpeedBoostEffect();
                }
                break;
                
            case this.powerUpTypes.SHIELD:
                this.scene.hasShield = activate;
                if (activate) {
                    this.createShieldEffect();
                } else {
                    this.removeShieldEffect();
                }
                break;
                
            case this.powerUpTypes.MAGNET:
                this.scene.hasMagnet = activate;
                if (!activate) {
                    this.removeMagnetEffect();
                }
                break;
                
            case this.powerUpTypes.TIME_SLOW:
                this.scene.hasTimeSlow = activate;
                if (activate) {
                    this.createTimeSlowEffect();
                } else {
                    this.removeTimeSlowEffect();
                }
                break;
                
            case this.powerUpTypes.GRAVITY_REVERSE:
                this.scene.hasGravityReverse = activate;
                if (activate) {
                    this.createGravityReverseEffect();
                } else {
                    this.removeGravityReverseEffect();
                }
                break;
                
            case this.powerUpTypes.MULTI_COLLECT:
                this.scene.hasMultiCollect = activate;
                break;
                
            case this.powerUpTypes.INVINCIBILITY:
                this.scene.hasInvincibility = activate;
                if (activate) {
                    this.createInvincibilityEffect();
                } else {
                    this.removeInvincibilityEffect();
                }
                break;
                
            case this.powerUpTypes.WALL_JUMP:
                this.scene.hasWallJump = activate;
                break;
                
            case this.powerUpTypes.DASH:
                this.scene.hasDash = activate;
                if (activate) {
                    this.createDashEffect();
                } else {
                    this.removeDashEffect();
                }
                break;
                
            case this.powerUpTypes.BOUNCE:
                this.scene.hasBounce = activate;
                if (activate) {
                    this.createBounceEffect();
                } else {
                    this.removeBounceEffect();
                }
                break;
                
            case this.powerUpTypes.PHASE_THROUGH:
                this.scene.hasPhaseThrough = activate;
                if (activate) {
                    this.createPhaseThroughEffect();
                } else {
                    this.removePhaseThroughEffect();
                }
                break;
                
            case this.powerUpTypes.CARROT_RAIN:
                if (activate) {
                    this.activateCarrotRain();
                }
                break;
                
            case this.powerUpTypes.TIME_FREEZE:
                this.scene.hasTimeFreeze = activate;
                if (activate) {
                    this.createTimeFreezeEffect();
                } else {
                    this.removeTimeFreezeEffect();
                }
                break;
                
            case this.powerUpTypes.GHOST_MODE:
                this.scene.hasGhostMode = activate;
                if (activate) {
                    this.createGhostModeEffect();
                } else {
                    this.removeGhostModeEffect();
                }
                break;
                
            case this.powerUpTypes.SUPER_JUMP:
                this.scene.hasSuperJump = activate;
                if (activate) {
                    this.createSuperJumpEffect();
                } else {
                    this.removeSuperJumpEffect();
                }
                break;
        }
    }
    
    createShieldEffect() {
        if (this.scene.shieldGraphics) {
            this.scene.shieldGraphics.destroy();
        }
        
        this.scene.shieldGraphics = this.scene.add.graphics();
        this.scene.shieldGraphics.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.shieldGraphics);
        
        // Animate shield
        this.scene.tweens.add({
            targets: this.scene.shieldGraphics,
            alpha: { from: 0.8, to: 0.3 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
    
    removeShieldEffect() {
        if (this.scene.shieldGraphics) {
            this.scene.shieldGraphics.destroy();
            this.scene.shieldGraphics = null;
        }
    }
    
    removeMagnetEffect() {
        if (this.scene.magnetField) {
            this.scene.magnetField.destroy();
            this.scene.magnetField = null;
        }
    }
    
    createSpeedBoostEffect() {
        if (this.scene.speedBoostTrail) {
            this.scene.speedBoostTrail.destroy();
        }
        
        this.scene.speedBoostTrail = this.scene.add.graphics();
        this.scene.speedBoostTrail.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.speedBoostTrail);
    }
    
    removeSpeedBoostEffect() {
        if (this.scene.speedBoostTrail) {
            this.scene.speedBoostTrail.destroy();
            this.scene.speedBoostTrail = null;
        }
    }
    
    createTimeSlowEffect() {
        // Slow down obstacle movement
        this.scene.timeScale = 0.5;
    }
    
    removeTimeSlowEffect() {
        this.scene.timeScale = 1.0;
    }
    
    createGravityReverseEffect() {
        // Reverse gravity for bunny
        this.scene.bunny.body.setGravityY(-2000);
    }
    
    removeGravityReverseEffect() {
        this.scene.bunny.body.setGravityY(2000);
    }
    
    showPowerUpEffect(text, color) {
        const effectText = this.scene.add.text(400, 300, text, {
            fontSize: '32px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(1000);
        
        // Animate the effect text
        this.scene.tweens.add({
            targets: effectText,
            y: effectText.y - 50,
            alpha: 0,
            scale: 1.5,
            duration: 1500,
            onComplete: () => effectText.destroy()
        });
    }
    
    updatePowerUpUI() {
        if (this.activePowerUps.size === 0) {
            this.activePowerUpsText.setText('');
            return;
        }
        
        let uiText = 'Active Power-ups:\n';
        this.activePowerUps.forEach((powerUp, type) => {
            const config = this.powerUpConfig[type];
            const remainingTime = Math.ceil((config.duration - (this.scene.time.now - powerUp.startTime)) / 1000);
            const stackText = powerUp.stacks > 1 ? ` x${powerUp.stacks}` : '';
            uiText += `${config.icon} ${remainingTime}s${stackText}\n`;
        });
        
        this.activePowerUpsText.setText(uiText);
    }
    
    updateComboUI() {
        if (this.comboCount > 1) {
            this.comboText.setText(`Combo: x${this.comboMultiplier.toFixed(1)}`);
        } else {
            this.comboText.setText('');
        }
    }
    
    updateHistoryUI() {
        if (this.powerUpHistory.length === 0) {
            this.historyText.setText('');
            return;
        }
        
        let historyText = 'Recent:\n';
        const recent = this.powerUpHistory.slice(-5);
        recent.forEach(item => {
            const config = this.powerUpConfig[item.type];
            historyText += `${config.icon} `;
        });
        
        this.historyText.setText(historyText);
    }
    
    update() {
        // Update magnet effect
        if (this.scene.hasMagnet) {
            this.applyMagnetEffect();
            this.updateMagnetVisual();
        }
        
        // Update shield position
        if (this.scene.hasShield && this.scene.shieldGraphics) {
            this.scene.shieldGraphics.clear();
            this.scene.shieldGraphics.fillStyle(0x4ECDC4, 0.6);
            this.scene.shieldGraphics.fillCircle(0, 0, 50);
            this.scene.shieldGraphics.lineStyle(3, 0x4ECDC4, 0.8);
            this.scene.shieldGraphics.strokeCircle(0, 0, 50);
        }
        
        // Update speed boost trail
        if (this.scene.speedBoostTrail && Math.abs(this.scene.runSpeed) > 50) {
            this.scene.speedBoostTrail.clear();
            this.scene.speedBoostTrail.fillStyle(0xFF6B35, 0.4);
            this.scene.speedBoostTrail.fillCircle(-30 * Math.sign(this.scene.runSpeed), 0, 15);
            this.scene.speedBoostTrail.fillStyle(0xFF6B35, 0.2);
            this.scene.speedBoostTrail.fillCircle(-50 * Math.sign(this.scene.runSpeed), 0, 10);
        }
        
        // Update time slow effect
        if (this.scene.hasTimeSlow) {
            this.applyTimeSlowEffect();
        }
        
        this.updatePowerUpUI();
        this.updateComboUI();
        this.updateHistoryUI();
    }
    
    updateMagnetVisual() {
        // Create or update magnet field visual
        if (!this.scene.magnetField) {
            this.scene.magnetField = this.scene.add.graphics();
            this.scene.magnetField.setPosition(this.scene.bunny.x, this.scene.bunny.y);
            this.scene.bunny.add(this.scene.magnetField);
        }
        
        this.scene.magnetField.clear();
        this.scene.magnetField.fillStyle(0xFFD93D, 0.1);
        this.scene.magnetField.fillCircle(0, 0, 200);
        this.scene.magnetField.lineStyle(2, 0xFFD93D, 0.3);
        this.scene.magnetField.strokeCircle(0, 0, 200);
        
        // Animate the field
        this.scene.magnetField.alpha = 0.3 + 0.2 * Math.sin(this.scene.time.now / 200);
    }
    
    applyMagnetEffect() {
        // Enhanced magnet logic for better carrot attraction
        this.scene.children.list.forEach(child => {
            if (child.type === 'Container' && child.body && child.body.velocity && 
                child.body.velocity.x < 0 && child.y > 100 && child.y < 500) {
                
                // Check if it's a carrot by looking for carrot graphics
                let isCarrot = false;
                let isPowerUp = false;
                
                if (child.list && child.list.length > 0) {
                    child.list.forEach(graphics => {
                        if (graphics.fillStyle && graphics.fillStyle.color === 0xFF8C00) {
                            isCarrot = true; // Orange color indicates carrot
                        }
                        if (graphics.fillStyle && (graphics.fillStyle.color === 0x00FFFF || 
                            graphics.fillStyle.color === 0xFF6B35 || 
                            graphics.fillStyle.color === 0x4ECDC4 || 
                            graphics.fillStyle.color === 0xFFD93D)) {
                            isPowerUp = true; // Power-up colors
                        }
                    });
                }
                
                if (isCarrot || isPowerUp) {
                    const distance = Phaser.Math.Distance.Between(
                        this.scene.bunny.x, this.scene.bunny.y,
                        child.x, child.y
                    );
                    
                    // Stronger attraction for closer items
                    if (distance < 200) {
                        const angle = Phaser.Math.Angle.Between(
                            child.x, child.y,
                            this.scene.bunny.x, this.scene.bunny.y
                        );
                        
                        // Stronger force for carrots, weaker for power-ups
                        const baseForce = isCarrot ? 10 : 5;
                        const force = (200 - distance) / 200 * baseForce;
                        
                        // Apply attraction force
                        child.body.setVelocityX(child.body.velocity.x + Math.cos(angle) * force);
                        child.body.setVelocityY(child.body.velocity.y + Math.sin(angle) * force);
                        
                        // Add magnetic particle effect
                        if (this.scene.time.now % 80 < 30) {
                            const particle = this.scene.add.circle(
                                child.x + Phaser.Math.Between(-10, 10),
                                child.y + Phaser.Math.Between(-10, 10),
                                2,
                                0xFFD93D,
                                0.6
                            );
                            
                            this.scene.tweens.add({
                                targets: particle,
                                x: this.scene.bunny.x + Phaser.Math.Between(-5, 5),
                                y: this.scene.bunny.y + Phaser.Math.Between(-5, 5),
                                alpha: 0,
                                duration: 300,
                                onComplete: () => particle.destroy()
                            });
                        }
                    }
                }
            }
        });
    }
    
    applyTimeSlowEffect() {
        // Slow down all moving objects
        this.scene.children.list.forEach(child => {
            if (child.body && child.body.velocity && child.body.velocity.x < 0) {
                child.body.setVelocityX(child.body.velocity.x * 0.5);
            }
        });
    }
    
    handleDoubleJump() {
        if (this.scene.hasDoubleJump && !this.scene.bunny.body.touching.down && !this.scene.isJumping) {
            this.scene.bunny.body.setVelocityY(-800);
            this.scene.isJumping = true;
            this.scene.doubleJumpCount = (this.scene.doubleJumpCount || 0) + 1;
            
            // Check if double jump is used up
            const powerUp = this.activePowerUps.get(this.powerUpTypes.DOUBLE_JUMP);
            if (powerUp && this.scene.doubleJumpCount >= powerUp.stacks) {
                this.scene.hasDoubleJump = false;
                this.scene.doubleJumpCount = 0;
                
                // Remove from active power-ups
                if (this.activePowerUps.has(this.powerUpTypes.DOUBLE_JUMP)) {
                    this.scene.time.removeEvent(this.activePowerUps.get(this.powerUpTypes.DOUBLE_JUMP).timer);
                    this.activePowerUps.delete(this.powerUpTypes.DOUBLE_JUMP);
                }
            }
            
            // Show double jump effect
            this.showDoubleJumpEffect();
        }
    }
    
    showDoubleJumpEffect() {
        // Create double jump particles
        for (let i = 0; i < 8; i++) {
            const particle = this.scene.add.circle(
                this.scene.bunny.x + Phaser.Math.Between(-20, 20),
                this.scene.bunny.y + 30,
                3,
                0x00FFFF,
                0.8
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-30, 30),
                y: particle.y - Phaser.Math.Between(20, 40),
                alpha: 0,
                duration: 500,
                onComplete: () => particle.destroy()
            });
        }
    }
    
    // New Power-up Effect Methods
    
    createInvincibilityEffect() {
        if (this.scene.invincibilityGraphics) {
            this.scene.invincibilityGraphics.destroy();
        }
        
        this.scene.invincibilityGraphics = this.scene.add.graphics();
        this.scene.invincibilityGraphics.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.invincibilityGraphics);
        
        // Golden glow effect
        this.scene.tweens.add({
            targets: this.scene.invincibilityGraphics,
            alpha: { from: 0.8, to: 0.2 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
    
    removeInvincibilityEffect() {
        if (this.scene.invincibilityGraphics) {
            this.scene.invincibilityGraphics.destroy();
            this.scene.invincibilityGraphics = null;
        }
    }
    
    createDashEffect() {
        if (this.scene.dashTrail) {
            this.scene.dashTrail.destroy();
        }
        
        this.scene.dashTrail = this.scene.add.graphics();
        this.scene.dashTrail.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.dashTrail);
        
        // Dash trail effect
        this.scene.tweens.add({
            targets: this.scene.dashTrail,
            alpha: { from: 0.6, to: 0.1 },
            duration: 300,
            yoyo: true,
            repeat: -1
        });
    }
    
    removeDashEffect() {
        if (this.scene.dashTrail) {
            this.scene.dashTrail.destroy();
            this.scene.dashTrail = null;
        }
    }
    
    createBounceEffect() {
        // Increase bounce multiplier
        this.scene.bounceMultiplier = 1.5;
    }
    
    removeBounceEffect() {
        this.scene.bounceMultiplier = 1.0;
    }
    
    createPhaseThroughEffect() {
        // Make bunny semi-transparent
        this.scene.bunny.setAlpha(0.6);
        
        // Add ghost trail effect
        if (this.scene.phaseTrail) {
            this.scene.phaseTrail.destroy();
        }
        
        this.scene.phaseTrail = this.scene.add.graphics();
        this.scene.phaseTrail.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.phaseTrail);
    }
    
    removePhaseThroughEffect() {
        this.scene.bunny.setAlpha(1.0);
        
        if (this.scene.phaseTrail) {
            this.scene.phaseTrail.destroy();
            this.scene.phaseTrail = null;
        }
    }
    
    activateCarrotRain() {
        // Spawn multiple carrots
        for (let i = 0; i < 15; i++) {
            this.scene.time.delayedCall(i * 100, () => {
                const carrot = this.scene.add.container(
                    this.scene.bunny.x + Phaser.Math.Between(-100, 100),
                    this.scene.bunny.y - 200
                );
                
                const carrotGraphics = this.scene.add.graphics();
                carrotGraphics.fillStyle(0xFF8C00, 1);
                carrotGraphics.fillTriangle(0, -15, -10, 15, 10, 15);
                carrotGraphics.fillStyle(0x006400, 1);
                carrotGraphics.fillTriangle(-8, -25, -5, -15, -2, -20);
                carrotGraphics.fillTriangle(2, -25, 5, -15, 8, -20);
                
                carrot.add(carrotGraphics);
                carrot.setSize(20, 30);
                this.scene.physics.add.existing(carrot);
                carrot.body.setVelocityY(200);
                carrot.body.setAllowGravity(false);
                
                // Auto-destroy after 3 seconds
                this.scene.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        if (carrot && carrot.active) {
                            carrot.destroy();
                        }
                    }
                });
            });
        }
        
        // Show carrot rain effect
        this.showPowerUpEffect('Carrot Rain!', 0xFF8C00);
    }
    
    createTimeFreezeEffect() {
        // Freeze all moving objects
        this.scene.children.list.forEach(child => {
            if (child.body && child.body.velocity) {
                child.frozenVelocity = { x: child.body.velocity.x, y: child.body.velocity.y };
                child.body.setVelocity(0, 0);
            }
        });
        
        // Add freeze visual effect
        if (this.scene.freezeOverlay) {
            this.scene.freezeOverlay.destroy();
        }
        
        this.scene.freezeOverlay = this.scene.add.graphics();
        this.scene.freezeOverlay.fillStyle(0x00CED1, 0.2);
        this.scene.freezeOverlay.fillRect(0, 0, 800, 600);
        this.scene.freezeOverlay.setDepth(999);
    }
    
    removeTimeFreezeEffect() {
        // Restore all velocities
        this.scene.children.list.forEach(child => {
            if (child.frozenVelocity) {
                child.body.setVelocity(child.frozenVelocity.x, child.frozenVelocity.y);
                delete child.frozenVelocity;
            }
        });
        
        if (this.scene.freezeOverlay) {
            this.scene.freezeOverlay.destroy();
            this.scene.freezeOverlay = null;
        }
    }
    
    createGhostModeEffect() {
        // Make bunny completely transparent
        this.scene.bunny.setAlpha(0.3);
        
        // Add ghost particles
        if (this.scene.ghostParticles) {
            this.scene.ghostParticles.destroy();
        }
        
        this.scene.ghostParticles = this.scene.add.graphics();
        this.scene.ghostParticles.setPosition(this.scene.bunny.x, this.scene.bunny.y);
        this.scene.bunny.add(this.scene.ghostParticles);
    }
    
    removeGhostModeEffect() {
        this.scene.bunny.setAlpha(1.0);
        
        if (this.scene.ghostParticles) {
            this.scene.ghostParticles.destroy();
            this.scene.ghostParticles = null;
        }
    }
    
    createSuperJumpEffect() {
        // Increase jump velocity multiplier
        this.scene.superJumpMultiplier = 2.0;
    }
    
    removeSuperJumpEffect() {
        this.scene.superJumpMultiplier = 1.0;
    }
    
    cleanup() {
        // Clean up all active power-ups
        this.activePowerUps.forEach((powerUp, type) => {
            this.scene.time.removeEvent(powerUp.timer);
            this.applyPowerUpEffect(type, false);
        });
        this.activePowerUps.clear();
        
        // Clean up timers
        if (this.spawnTimer) {
            this.scene.time.removeEvent(this.spawnTimer);
        }
        if (this.comboTimer) {
            this.scene.time.removeEvent(this.comboTimer);
        }
        
        // Clean up UI
        if (this.powerUpUI) {
            this.powerUpUI.destroy();
        }
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PowerUpManager;
} 