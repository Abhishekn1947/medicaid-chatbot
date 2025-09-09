// src/app/app.component.ts
// TEMPLATE NOTICE: This component contains SAMPLE healthcare dashboard data
// Replace the sample data and metrics with your own application content
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChatbotWidgetComponent } from './components/chatbot-widget/chatbot-widget.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ChatbotWidgetComponent,
    DashboardStatsComponent
  ],
  template: `
    <div class="app-container">
      <!-- Background Elements -->
      <div class="bg-elements">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
        <div class="bg-circle bg-circle-3"></div>
      </div>

      <!-- Header -->
      <mat-toolbar class="app-header">
        <div class="header-content">
          <div class="app-title animate-fade-in-up">
            <div class="logo-wrapper">
              <mat-icon class="logo-icon">local_hospital</mat-icon>
              <div class="logo-pulse"></div>
            </div>
            <div class="title-text">
              <span class="title-main">Medicaid Assistant</span>
              <span class="title-sub">Member Services Portal</span>
            </div>
          </div>
          <div class="header-actions animate-fade-in-up">
            <button mat-button class="header-btn notification-btn">
              <div class="notification-icon-wrapper">
                <mat-icon>notifications</mat-icon>
                <div class="notification-badge">
                  <span class="badge-count">3</span>
                  <div class="badge-pulse"></div>
                </div>
              </div>
            </button>
            <button mat-button class="header-btn">
              <mat-icon>settings</mat-icon>
              Settings
            </button>
            <button mat-raised-button class="admin-btn">
              <mat-icon>account_circle</mat-icon>
              Admin Portal
            </button>
          </div>
        </div>
      </mat-toolbar>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Welcome Section -->
        <div class="welcome-section animate-fade-in-up">
          <h1 class="welcome-title">Dashboard Overview</h1>
          <p class="welcome-subtitle">Monitor your Medicaid chatbot performance and member interactions</p>
        </div>

        <div class="dashboard-grid">
          <!-- System Stats Widget -->
          <mat-card class="dashboard-card stats-card glass-white animate-fade-in-scale">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>bar_chart</mat-icon>
                System Overview
              </mat-card-title>
              <mat-card-subtitle>Real-time performance metrics</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <app-dashboard-stats></app-dashboard-stats>
            </mat-card-content>
          </mat-card>

          <!-- Member Analytics Widget -->
          <mat-card class="dashboard-card analytics-card glass-white animate-fade-in-scale">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>people</mat-icon>
                Member Analytics
              </mat-card-title>
              <mat-card-subtitle>Today's membership activity</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-accordion class="analytics-accordion">
                <mat-expansion-panel class="analytics-panel" [expanded]="true">
                  <mat-expansion-panel-header>
                    <mat-panel-title class="panel-title">
                      <div class="category-icon" style="background: var(--primary-gradient)">
                        <mat-icon>trending_up</mat-icon>
                      </div>
                      <span>Current Period Metrics</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="analytics-grid">
                    <div class="analytic-item">
                      <div class="analytic-number">1.2M</div>
                      <div class="analytic-label">Active MD Members</div>
                      <div class="analytic-trend positive">+3.8%</div>
                    </div>
                    <div class="analytic-item">
                      <div class="analytic-number">23,567</div>
                      <div class="analytic-label">New Enrollments</div>
                      <div class="analytic-trend positive">+18%</div>
                    </div>
                    <div class="analytic-item">
                      <div class="analytic-number">1,234</div>
                      <div class="analytic-label">Pending MCO Selections</div>
                      <div class="analytic-trend neutral">+45</div>
                    </div>
                    <div class="analytic-item">
                      <div class="analytic-number">96.7%</div>
                      <div class="analytic-label">Member Satisfaction</div>
                      <div class="analytic-trend positive">+1.2%</div>
                    </div>
                  </div>
                </mat-expansion-panel>
                <mat-expansion-panel class="analytics-panel">
                  <mat-expansion-panel-header>
                    <mat-panel-title class="panel-title">
                      <div class="category-icon" style="background: var(--success-gradient)">
                        <mat-icon>timeline</mat-icon>
                      </div>
                      <span>Historical Trends</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="historical-trends">
                    <div class="trend-item">
                      <span class="trend-period">Last 30 Days</span>
                      <span class="trend-value">+15.2% Enrollment Growth</span>
                      <span class="trend-indicator positive">↗</span>
                    </div>
                    <div class="trend-item">
                      <span class="trend-period">Last Quarter</span>
                      <span class="trend-value">94.1% Average Satisfaction</span>
                      <span class="trend-indicator positive">↗</span>
                    </div>
                    <div class="trend-item">
                      <span class="trend-period">Year to Date</span>
                      <span class="trend-value">127,456 New Members</span>
                      <span class="trend-indicator positive">↗</span>
                    </div>
                  </div>
                </mat-expansion-panel>
              </mat-accordion>
            </mat-card-content>
          </mat-card>

          <!-- Geographic Distribution -->
          <mat-card class="dashboard-card geo-card glass-white animate-fade-in-scale">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>map</mat-icon>
                Geographic Distribution
              </mat-card-title>
              <mat-card-subtitle>Member locations by county</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-accordion class="geo-accordion">
                <mat-expansion-panel class="geo-panel" [expanded]="true">
                  <mat-expansion-panel-header>
                    <mat-panel-title class="panel-title">
                      <div class="category-icon" style="background: var(--secondary-gradient)">
                        <mat-icon>location_city</mat-icon>
                      </div>
                      <span>County Distribution</span>
                      <span class="category-count">({{geographicData.length}})</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="geo-stats">
                    <div class="geo-item" *ngFor="let geo of geographicData">
                      <div class="geo-info">
                        <div class="geo-county">{{geo.county}}</div>
                        <div class="geo-members">{{geo.members}} members</div>
                      </div>
                      <div class="geo-progress">
                        <div class="progress-bar" [style.width.%]="geo.percentage"></div>
                      </div>
                      <div class="geo-percentage">{{geo.percentage}}%</div>
                    </div>
                  </div>
                </mat-expansion-panel>
                <mat-expansion-panel class="geo-panel">
                  <mat-expansion-panel-header>
                    <mat-panel-title class="panel-title">
                      <div class="category-icon" style="background: var(--warning-gradient)">
                        <mat-icon>insights</mat-icon>
                      </div>
                      <span>Regional Insights</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="regional-insights">
                    <div class="insight-item">
                      <div class="insight-header">
                        <mat-icon>trending_up</mat-icon>
                        <span>Fastest Growing Region</span>
                      </div>
                      <div class="insight-content">
                        <span class="insight-location">Montgomery County</span>
                        <span class="insight-value">+22% this quarter</span>
                      </div>
                    </div>
                    <div class="insight-item">
                      <div class="insight-header">
                        <mat-icon>people</mat-icon>
                        <span>Highest Utilization</span>
                      </div>
                      <div class="insight-content">
                        <span class="insight-location">Baltimore City</span>
                        <span class="insight-value">87% service usage</span>
                      </div>
                    </div>
                    <div class="insight-item">
                      <div class="insight-header">
                        <mat-icon>language</mat-icon>
                        <span>Multilingual Support</span>
                      </div>
                      <div class="insight-content">
                        <span class="insight-location">Prince George's County</span>
                        <span class="insight-value">45% Spanish speakers</span>
                      </div>
                    </div>
                  </div>
                </mat-expansion-panel>
              </mat-accordion>
            </mat-card-content>
          </mat-card>




          <!-- Recent Activity Widget -->
          <mat-card class="dashboard-card activity-card full-width glass-white animate-fade-in-scale">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>history</mat-icon>
                Recent Chatbot Interactions
              </mat-card-title>
              <mat-card-subtitle>Latest member conversations and system events</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <mat-accordion class="activity-accordion">
                <mat-expansion-panel 
                  *ngFor="let category of activityCategories; let i = index"
                  class="activity-panel"
                  [expanded]="i === 0">
                  <mat-expansion-panel-header>
                    <mat-panel-title class="panel-title">
                      <div class="category-icon" [style.background]="category.color">
                        <mat-icon>{{category.icon}}</mat-icon>
                      </div>
                      <span>{{category.name}}</span>
                      <span class="category-count">({{category.activities.length}})</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <div class="category-activities">
                    <div
                      class="activity-item animate-fade-in-up"
                      *ngFor="let activity of category.activities; let j = index"
                      [style.animation-delay.ms]="j * 50">
                      <div class="activity-icon" [style.background]="getActivityColor(activity.type)">
                        <mat-icon>{{getActivityIcon(activity.type)}}</mat-icon>
                      </div>
                      <div class="activity-info">
                        <div class="activity-header">
                          <span class="activity-type">{{activity.type}}</span>
                          <span class="activity-status" [class]="getStatusClass(activity.status)">{{activity.status}}</span>
                        </div>
                        <span class="activity-description">{{activity.description}}</span>
                      </div>
                      <div class="activity-meta">
                        <span class="activity-time">{{activity.time}}</span>
                        <button mat-icon-button class="activity-action">
                          <mat-icon>more_vert</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </mat-expansion-panel>
              </mat-accordion>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <!-- Chatbot Widget -->
      <app-chatbot-widget></app-chatbot-widget>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      position: relative;
    }

    /* Background Elements */
    .bg-elements {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }

    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      opacity: 0.05;
    }

    .bg-circle-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: -100px;
    }

    .bg-circle-2 {
      width: 150px;
      height: 150px;
      top: 50%;
      right: -75px;
    }

    .bg-circle-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 10%;
    }

    /* Header Styles */
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 clamp(16px, 4vw, 48px);
      height: 64px;
      gap: clamp(16px, 3vw, 32px);
    }

    .app-title {
      display: flex;
      align-items: center;
      gap: clamp(12px, 2vw, 20px);
      color: white;
      flex-shrink: 0;
    }

    .logo-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      z-index: 1;
      color: white;
    }

    .logo-pulse {
      position: absolute;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: pulse-ring 2s infinite;
    }

    @keyframes pulse-ring {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    .title-text {
      display: flex;
      flex-direction: column;
    }

    .title-main {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .title-sub {
      font-size: 0.9rem;
      opacity: 0.8;
      font-weight: 400;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: clamp(8px, 1.5vw, 16px);
      flex-shrink: 0;
    }

    .header-btn {
      color: white !important;
      position: relative;
      border-radius: var(--border-radius) !important;
      transition: all var(--animation-fast);
    }

    .header-btn:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      transform: translateY(-1px);
    }

    .notification-btn {
      position: relative;
    }

    .notification-icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      background: #ff4757;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
      border: 2px solid white;
    }

    .badge-count {
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 2;
      position: relative;
    }

    .badge-pulse {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ff4757;
      border-radius: 50%;
      opacity: 0.6;
      animation: notification-pulse 2s infinite;
    }

    @keyframes notification-pulse {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.3;
      }
      100% {
        transform: scale(1);
        opacity: 0.6;
      }
    }

    .admin-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      backdrop-filter: blur(10px);
      transition: all var(--animation-normal);
    }

    .admin-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: translateY(-2px);
      box-shadow: var(--shadow-light);
    }

    /* Main Content */
    .main-content {
      padding: 48px 32px;
      width: 100%;
      margin: 0;
      max-width: 1600px;
      margin: 0 auto;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 56px;
    }

    .welcome-title {
      font-size: 3.2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 50%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 16px;
      line-height: 1.1;
      letter-spacing: -0.5px;
      position: relative;
    }

    .welcome-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: var(--primary-gradient);
      border-radius: 2px;
    }

    .welcome-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 400;
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
      letter-spacing: 0.3px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-bottom: 48px;
      width: 100%;
      max-width: 100%;
      padding: 0 8px;
    }

    .dashboard-card {
      height: 420px;
      width: 100%;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .dashboard-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      z-index: 1;
    }

    .dashboard-card:hover {
      transform: translateY(-8px);
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255,255,255,0.2);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .dashboard-card .mat-mdc-card-header {
      padding: 32px 32px 20px 32px;
      position: relative;
      z-index: 2;
    }

    .dashboard-card .mat-mdc-card-content {
      padding: 0 32px 32px 32px;
      position: relative;
      z-index: 2;
      flex: 1;
      overflow-y: auto;
    }

    .dashboard-card .mat-mdc-card-title {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 1.4rem;
      font-weight: 700;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }

    .dashboard-card .mat-mdc-card-title mat-icon {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .dashboard-card .mat-mdc-card-subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      font-weight: 400;
      letter-spacing: 0.3px;
    }

    .full-width {
      grid-column: 1 / -1;
      height: 500px;
    }



    /* Analytics Grid */
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      padding: 16px 24px 24px 24px;
      background: rgba(0, 0, 0, 0.2) !important;
      border-radius: 0 0 12px 12px;
    }

    .analytic-item {
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 16px;
      padding: 20px 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .analytic-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.6s ease;
    }

    .analytic-item:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
      background: rgba(0, 0, 0, 0.4) !important;
      border-color: rgba(255, 255, 255, 0.3);
    }

    .analytic-item:hover::before {
      left: 100%;
    }

    .analytic-number {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff !important;
      margin-bottom: 6px;
      position: relative;
      z-index: 1;
    }

    .analytic-label {
      color: rgba(255, 255, 255, 0.9) !important;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 12px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .analytic-trend {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 16px;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      position: relative;
      z-index: 1;
    }

    .analytic-trend.positive {
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
      color: #66BB6A !important;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .analytic-trend.negative {
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1));
      color: #EF5350 !important;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .analytic-trend.neutral {
      background: linear-gradient(135deg, rgba(158, 158, 158, 0.2), rgba(158, 158, 158, 0.1));
      color: #BDBDBD !important;
      border: 1px solid rgba(158, 158, 158, 0.3);
    }

    /* Geographic Stats */
    .geo-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 300px;
      overflow-y: auto;
      padding: 16px 24px 24px 24px;
      background: rgba(0, 0, 0, 0.2) !important;
      border-radius: 0 0 12px 12px;
    }

    .geo-stats::-webkit-scrollbar {
      width: 6px;
    }

    .geo-stats::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    .geo-stats::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }

    .geo-stats::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    .geo-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
      background: rgba(0, 0, 0, 0.25) !important;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.3s ease;
      position: relative;
      margin-bottom: 8px;
    }

    .geo-item:last-child {
      margin-bottom: 0;
    }

    .geo-item:hover {
      background: rgba(0, 0, 0, 0.35) !important;
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateX(2px);
    }

    .geo-info {
      min-width: 180px;
      flex-shrink: 0;
    }

    .geo-county {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95) !important;
      font-size: 0.85rem;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .geo-members {
      color: rgba(255, 255, 255, 0.65) !important;
      font-size: 0.72rem;
      font-weight: 400;
    }

    .geo-progress {
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
      position: relative;
      margin: 0 12px;
    }

    .geo-percentage {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9) !important;
      font-size: 0.78rem;
      min-width: 40px;
      text-align: right;
      flex-shrink: 0;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 3px;
      transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .progress-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: progressShimmer 2s infinite;
    }

    @keyframes progressShimmer {
      0% { left: -100%; }
      50% { left: 100%; }
      100% { left: 100%; }
    }




    /* Activity List */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 340px;
      overflow-y: auto;
      padding-right: 8px;
    }

    .activity-list::-webkit-scrollbar {
      width: 6px;
    }

    .activity-list::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    /* Activity Accordion */
    .activity-accordion {
      background: transparent;
    }

    .activity-panel {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px !important;
      margin-bottom: 16px !important;
      overflow: hidden;
    }

    .activity-panel:last-child {
      margin-bottom: 0 !important;
    }

    .activity-panel .mat-expansion-panel-header {
      background: rgba(255, 255, 255, 0.08) !important;
      color: rgba(255, 255, 255, 0.9) !important;
      border-radius: 12px !important;
      padding: 16px 24px !important;
      height: auto !important;
    }

    .activity-panel.mat-expanded .mat-expansion-panel-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px 12px 0 0 !important;
    }

    .panel-title {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
      font-weight: 600 !important;
      font-size: 1rem !important;
    }

    .category-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .category-icon mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .category-count {
      margin-left: auto !important;
      background: rgba(255, 255, 255, 0.1);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .category-activities {
      padding: 16px 24px 24px 24px;
      background: rgba(255, 255, 255, 0.02);
    }

    .category-activities .activity-item {
      margin-bottom: 12px;
    }

    .category-activities .activity-item:last-child {
      margin-bottom: 0;
    }

    /* Analytics Accordion */
    .analytics-accordion,
    .geo-accordion {
      background: transparent;
    }

    .analytics-panel,
    .geo-panel {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px !important;
      margin-bottom: 16px !important;
      overflow: hidden;
    }

    .analytics-panel:last-child,
    .geo-panel:last-child {
      margin-bottom: 0 !important;
    }

    .analytics-panel .mat-expansion-panel-header,
    .geo-panel .mat-expansion-panel-header {
      background: rgba(255, 255, 255, 0.08) !important;
      color: rgba(255, 255, 255, 0.9) !important;
      border-radius: 12px !important;
      padding: 16px 24px !important;
      height: auto !important;
    }

    .analytics-panel.mat-expanded .mat-expansion-panel-header,
    .geo-panel.mat-expanded .mat-expansion-panel-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px 12px 0 0 !important;
    }

    /* Historical Trends */
    .historical-trends {
      padding: 16px 24px 24px 24px;
      background: rgba(0, 0, 0, 0.2) !important;
      border-radius: 0 0 12px 12px;
    }

    .trend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 12px;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .trend-item:last-child {
      margin-bottom: 0;
    }

    .trend-item:hover {
      background: rgba(0, 0, 0, 0.4) !important;
      transform: translateX(4px);
    }

    .trend-period {
      color: rgba(255, 255, 255, 0.8) !important;
      font-size: 0.8rem;
      font-weight: 500;
      min-width: 90px;
    }

    .trend-value {
      color: rgba(255, 255, 255, 0.95) !important;
      font-weight: 600;
      font-size: 0.85rem;
      flex: 1;
      text-align: center;
    }

    .trend-indicator {
      font-size: 1rem;
      font-weight: bold;
      min-width: 20px;
      text-align: right;
    }

    .trend-indicator.positive {
      color: #4CAF50 !important;
    }

    .trend-indicator.negative {
      color: #f44336 !important;
    }

    /* Regional Insights */
    .regional-insights {
      padding: 16px 24px 24px 24px;
      background: rgba(0, 0, 0, 0.2) !important;
      border-radius: 0 0 12px 12px;
    }

    .insight-item {
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .insight-item:last-child {
      margin-bottom: 0;
    }

    .insight-item:hover {
      background: rgba(0, 0, 0, 0.4) !important;
      transform: translateY(-2px);
    }

    .insight-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .insight-header mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: rgba(255, 255, 255, 0.7) !important;
    }

    .insight-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .insight-location {
      color: rgba(255, 255, 255, 0.95) !important;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .insight-value {
      color: #4CAF50 !important;
      font-weight: 600;
      font-size: 0.8rem;
      background: rgba(76, 175, 80, 0.1);
      padding: 3px 10px;
      border-radius: 10px;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-light);
      transition: all var(--animation-fast);
      position: relative;
      overflow: hidden;
    }

    .activity-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--primary-gradient);
    }

    .activity-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-medium);
      background: rgba(255, 255, 255, 0.95);
    }

    .activity-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
      box-shadow: var(--shadow-light);
      transition: all var(--animation-fast);
    }

    .activity-item:hover .activity-icon {
      transform: scale(1.1);
    }

    .activity-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .activity-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .activity-type {
      font-weight: 600;
      color: #333;
      font-size: 1rem;
    }

    .activity-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-completed {
      background: var(--success-gradient);
      color: white;
    }

    .status-active {
      background: var(--primary-gradient);
      color: white;
    }

    .status-pending {
      background: var(--warning-gradient);
      color: white;
    }

    .activity-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .activity-meta {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .activity-time {
      color: #999;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .activity-action {
      opacity: 0;
      transition: all var(--animation-fast);
    }

    .activity-item:hover .activity-action {
      opacity: 1;
    }

    /* Responsive Design */
    @media (max-width: 1400px) {
      .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
      }
    }

    @media (max-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .header-content {
        padding: 0 clamp(12px, 3vw, 24px);
        gap: clamp(12px, 2.5vw, 24px);
      }

      .main-content {
        padding: 32px 24px;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .welcome-title {
        font-size: 2.8rem;
      }

      .welcome-subtitle {
        font-size: 1.1rem;
      }

      .dashboard-card .mat-mdc-card-header {
        padding: 24px 24px 16px 24px;
      }

      .dashboard-card .mat-mdc-card-content {
        padding: 0 24px 24px 24px;
      }

      .dashboard-card {
        height: 380px;
      }

      .full-width {
        height: 450px;
      }

    }

    @media (max-width: 768px) {
      .welcome-title {
        font-size: 2.4rem;
      }

      .welcome-subtitle {
        font-size: 1rem;
      }

      .main-content {
        padding: 24px 16px;
      }

      .dashboard-grid {
        gap: 24px;
        padding: 0 4px;
      }

      .header-content {
        padding: 0 clamp(8px, 2vw, 16px);
        gap: clamp(8px, 2vw, 16px);
        height: 56px;
      }

      .app-title {
        gap: clamp(8px, 1.5vw, 12px);
      }

      .header-actions {
        gap: clamp(4px, 1vw, 8px);
      }


      .dashboard-card .mat-mdc-card-header {
        padding: 20px 20px 12px 20px;
      }

      .dashboard-card .mat-mdc-card-content {
        padding: 0 20px 20px 20px;
      }

      .dashboard-card {
        height: 360px;
      }

      .full-width {
        height: 400px;
      }


      .title-text {
        display: none;
      }

      .header-actions .header-btn span {
        display: none;
      }

      .analytics-grid {
        gap: 16px;
      }

      .geo-stats {
        gap: 16px;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        padding: 0 8px;
        gap: 8px;
        height: 48px;
      }

      .app-title {
        gap: 6px;
      }

      .header-actions {
        gap: 4px;
      }

      .logo-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .title-main {
        font-size: 1.1rem;
      }



      .activity-item {
        padding: 16px;
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }

      .activity-header {
        justify-content: center;
      }

      .activity-meta {
        justify-content: center;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  Math = Math;

  // SAMPLE DATA - Replace with your own geographic/demographic data
  geographicData = [
    { county: 'Region A', members: '87,456', percentage: 28 },
    { county: 'Region B', members: '76,234', percentage: 24 },
    { county: 'Region C', members: '45,678', percentage: 15 },
    { county: 'Region D', members: '34,567', percentage: 11 },
    { county: 'Region E', members: '23,456', percentage: 8 },
    { county: 'Region F', members: '18,234', percentage: 6 },
    { county: 'Other Regions', members: '25,789', percentage: 8 }
  ];



  // SAMPLE ACTIVITY DATA - Replace with your own chatbot interaction categories
  activityCategories = [
    {
      name: 'Plan Enrollment & Benefits',
      icon: 'assignment',
      color: 'var(--primary-gradient)',
      activities: [
        {
          type: 'MCO Plan Selection',
          description: 'Member in Baltimore City successfully enrolled in Priority Partners MCO plan',
          time: '3 minutes ago',
          status: 'completed'
        },
        {
          type: 'Benefits Verification',
          description: 'Complex eligibility question regarding dual enrollment - escalated to Maryland Health Department',
          time: '18 minutes ago',
          status: 'pending'
        },
        {
          type: 'Coverage Change',
          description: 'Member requested switch from Aetna Better Health to AmeriHealth Caritas',
          time: '45 minutes ago',
          status: 'completed'
        },
        {
          type: 'Renewal Assistance',
          description: 'Guided member through annual renewal process and updated contact information',
          time: '1 hour ago',
          status: 'completed'
        }
      ]
    },
    {
      name: 'Provider & Medical Services',
      icon: 'local_hospital',
      color: 'var(--success-gradient)',
      activities: [
        {
          type: 'Provider Directory',
          description: 'Located primary care physician in Montgomery County accepting new Medicaid patients',
          time: '7 minutes ago',
          status: 'completed'
        },
        {
          type: 'Specialist Referral',
          description: 'Facilitated referral to endocrinologist at Johns Hopkins for diabetes management',
          time: '25 minutes ago',
          status: 'active'
        },
        {
          type: 'Pharmacy Coverage',
          description: 'Verified prescription coverage and located participating pharmacy in Anne Arundel County',
          time: '38 minutes ago',
          status: 'completed'
        },
        {
          type: 'Mental Health Services',
          description: 'Connected member with behavioral health provider in Prince George\'s County',
          time: '52 minutes ago',
          status: 'completed'
        }
      ]
    },
    {
      name: 'Transportation & Support',
      icon: 'directions_car',
      color: 'var(--secondary-gradient)',
      activities: [
        {
          type: 'Transportation Services',
          description: 'Scheduled non-emergency medical transport for dialysis appointment in Prince George\'s County',
          time: '12 minutes ago',
          status: 'active'
        },
        {
          type: 'Language Support',
          description: 'Conversation switched to Spanish for member in Eastern Shore region',
          time: '28 minutes ago',
          status: 'completed'
        },
        {
          type: 'Accessibility Services',
          description: 'Arranged interpreter services for deaf member\'s upcoming appointment',
          time: '1.5 hours ago',
          status: 'completed'
        }
      ]
    },
    {
      name: 'Emergency & Urgent Care',
      icon: 'local_emergency',
      color: 'var(--warning-gradient)',
      activities: [
        {
          type: 'Emergency Coverage',
          description: 'Provided urgent care facility locations and coverage information for Baltimore County member',
          time: '35 minutes ago',
          status: 'completed'
        },
        {
          type: 'Crisis Support',
          description: 'Connected member experiencing mental health crisis with immediate resources',
          time: '2 hours ago',
          status: 'completed'
        },
        {
          type: 'After Hours Care',
          description: 'Guided member to nearest 24-hour clinic for non-emergency medical issue',
          time: '3 hours ago',
          status: 'completed'
        }
      ]
    }
  ];

  recentActivities = this.activityCategories.flatMap(category => category.activities);

  ngOnInit() {
    // Initialize dashboard data and start any animations
    this.animateElements();
  }

  private animateElements() {
    // Add staggered animation delays for better UX
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${0.1 + index * 0.1}s`;
    });
  }


  getActivityIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'MCO Plan Selection': 'assignment',
      'Provider Directory': 'local_hospital',
      'Transportation Services': 'directions_car',
      'Benefits Verification': 'verified_user',
      'Pharmacy Coverage': 'medication',
      'Language Support': 'language',
      'Emergency Coverage': 'local_emergency',
      'Coverage Change': 'swap_horiz',
      'Renewal Assistance': 'refresh',
      'Specialist Referral': 'person_search',
      'Mental Health Services': 'psychology',
      'Accessibility Services': 'accessibility',
      'Crisis Support': 'support',
      'After Hours Care': 'schedule'
    };
    return iconMap[type] || 'info';
  }

  getActivityColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      'MCO Plan Selection': 'var(--primary-gradient)',
      'Provider Directory': 'var(--success-gradient)',
      'Transportation Services': 'var(--secondary-gradient)',
      'Benefits Verification': 'var(--warning-gradient)',
      'Pharmacy Coverage': '#9C27B0',
      'Language Support': '#00BCD4',
      'Emergency Coverage': '#F44336',
      'Coverage Change': '#FF5722',
      'Renewal Assistance': '#4CAF50',
      'Specialist Referral': '#3F51B5',
      'Mental Health Services': '#E91E63',
      'Accessibility Services': '#795548',
      'Crisis Support': '#FF9800',
      'After Hours Care': '#607D8B'
    };
    return colorMap[type] || 'var(--primary-gradient)';
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }



}
