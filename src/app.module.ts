import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from "./album/album.entity";
import { Comment } from "./comment/comment.entity";
import { Prize } from "./prize/prize.entity";
import { Track } from "./track/track.entity";
import { CollectorAlbum } from './collectoralbum/collectoralbum.entity';
import { Band } from './band/band.entity';
import { Collector } from './collector/collector.entity';
import { Musician } from './musician/musician.entity';
import { Performer } from './performer/performer.entity';
import { PerformerPrize } from './performerprize/performerprize.entity';

import { RecordLabelModule } from './recordlabel/recordlabel.module';
import { PrizeModule } from './prize/prize.module';
import { TrackModule } from './track/track.module';
import { CollectorModule } from './collector/collector.module';
import { PerformerModule } from './performer/performer.module';
import { BandModule } from './band/band.module';
import { MusicianModule } from './musician/musician.module';
import { AlbumModule } from './album/album.module';
import { GenreModule } from './genre/genre.module';
import { CommentModule } from './comment/comment.module';
import { CollectorAlbumModule } from './collectoralbum/collectoralbum.module';
import { AlbumstatusModule } from './albumstatus/albumstatus.module';
import { PerformerprizeModule } from './performerprize/performerprize.module';
import { BandmusicianModule } from './bandmusician/bandmusician.module';
import { MusicianAlbumModule } from './musicianalbum/musicianalbum.module';
import { BandAlbumModule } from './bandalbum/bandalbum.module';
import { CollectorPerformerModule } from './collectorperformer/collectorperformer.module';
import { AlbumBandModule } from './albumband/albumband.module';
import { AlbumMusicianModule } from './albummusician/albummusician.module';

// Parse DATABASE_URL for Render.com compatibility
function getDatabaseConfig() {
  // Render.com provides DATABASE_URL in format: postgres://user:password@host:port/database
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    try {
      // Handle postgres:// and postgresql:// URLs by replacing with http:// for URL parsing
      const urlString = databaseUrl.replace(/^postgres(ql)?:\/\//, 'http://');
      const url = new URL(urlString);
      
      return {
        type: 'postgres',
        host: url.hostname,
        port: parseInt(url.port, 10) || 5432,
        username: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.slice(1), // Remove leading '/'
        ssl: {
          rejectUnauthorized: false,
        },
      };
    } catch (error) {
      console.error('Error parsing DATABASE_URL:', error);
      // Fall through to use individual env vars
    }
  }
  
  // Fallback to individual environment variables for local development
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'vinyls',
    ssl: process.env.USE_SSL === 'true' ? {
      rejectUnauthorized: false,
    } : undefined,
  };
}

const dbConfig = getDatabaseConfig();

@Module({
  imports: [  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      ssl: dbConfig.ssl,
      entities: [Album, CollectorAlbum, Band, Collector, Comment, Musician, Performer, PerformerPrize, Prize, Track,],
      dropSchema: false,
      synchronize: process.env.NODE_ENV !== 'production',
      keepConnectionAlive: true,
      migrations: [__dirname + '/migration/**/*{.ts,.js}'],
      migrationsRun: process.env.NODE_ENV === 'production',
    }),
    RecordLabelModule,
    PrizeModule,
    TrackModule,
    CollectorModule,
    PerformerModule,
    BandModule,
    MusicianModule,
    AlbumModule,
    GenreModule,
    CommentModule,
    CollectorAlbumModule,
    AlbumstatusModule,
    PerformerprizeModule,
    BandmusicianModule,
    MusicianAlbumModule,
    BandAlbumModule,
    CollectorPerformerModule,
    AlbumBandModule,
    AlbumMusicianModule],
})
export class AppModule { }
