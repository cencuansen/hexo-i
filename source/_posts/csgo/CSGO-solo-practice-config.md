---
title: CSGO 单机练习配置
tags:
  - CSGO
categories:
  - CSGO
date: 2023-03-04 20:43:01
---

将配置保存到 `[配置文件名].cfg` 文件中，然后在游戏里的控制台执行 `exce 配置文件名` 加载配置。

单机投掷物练习配置：

```text
sv_cheats 1
sv_alltalk 1
sv_grenade_trajectory 0
sv_grenade_trajectory_thickness 0.1
sv_grenade_trajectory_time 5
sv_showimpacts 0
sv_showimpacts_time 0
sv_infinite_ammo 2
ammo_grenade_limit_total 5
bot_stop 1
bot_chatter off
mp_warmuptime 60
mp_teammates_are_enemies 1
mp_maxmoney 999999
mp_startmoney 999999
mp_freezetime 0
mp_buytime 999999
mp_buy_anywhere 1
mp_limitteams 0
mp_autoteambalance 0
mp_c4timer 3600
mp_randomspawn 1
mp_roundtime_defuse 60
mp_roundtime_hostage 60
mp_respawn_on_death_t 1
mp_respawn_on_death_ct 1
mp_death_drop_c4 0
mp_death_drop_gun 0
mp_death_drop_taser 0
mp_death_drop_grenade 0
mp_death_drop_defuser 0
mp_death_drop_breachcharge 1
bind alt noclip
mp_restartgame 1
```

局域网对战模式配置：

```text
sv_lan 1
sv_cheats 0
sv_alltalk 1
sv_showimpacts 0
sv_matchend_drops_enabled 0
ammo_grenade_limit_total 5
bot_stop 0
bot_chatter off
bot_difficulty 0
bot_dont_shoot 0
mp_warmup_end
mp_teammates_are_enemies 0
mp_roundtime_defuse 60
mp_roundtime_hostage 60
mp_maxmoney 65535
mp_startmoney 65535
mp_freezetime 0
mp_buytime 999999
mp_buy_anywhere 1
mp_limitteams 0
mp_autoteambalance 0
mp_c4timer 9999999
mp_randomspawn 1
mp_respawn_on_death_t 1
mp_respawn_on_death_ct 1
mp_death_drop_gun 0
mp_death_drop_grenade 0
mp_death_drop_defuser 0
mp_death_drop_taser 0
mp_friendlyfire 0
mp_death_drop_c4 0
mp_ignore_round_win_conditions 1
mp_t_default_primary weapon_ak47
mp_ct_default_primary weapon_ak47
mp_t_default_secondary weapon_deagle
mp_ct_default_secondary weapon_deagle
mp_restartgame 1
```
