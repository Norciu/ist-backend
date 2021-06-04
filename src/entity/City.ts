import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Street } from './Street';
import { Location } from './Location';

@Entity() //Oznaczamy klasę jako tabelę
export class City { //Oznaczamy klasę jako tabelę
  @PrimaryGeneratedColumn() //Określa pole id jako PK i auto_generated
  id!: number;

  @Column({
    name: 'city_name', //Nazwa pola jaką ma utworzyć w bazie
    length: 50, //Długość pola, w tym wypadku będzie to VARCHAR(50)
  })
  cityName!: string; //Nazwa krotki dla bilbioteki TypeORM wraz z typem;

  @Column({
    name: 'postal_code',
    length: 6,
  })
  postalCode!: string;

  @Column({
    nullable: false, //Pole nie może zawierać null
    length: 7,
    unique: true //Tworzy klucz unikalny
  })
  simc!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) //Tworzy kolumnę z typem danych timestamp
  createdAt!: number;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: number;

  @OneToMany((type) => Street, (street) => street.city, { cascade:true }) //Tworzy relację oraz klucze obce (@oneToMany -> Relacja 1:m)
  streets!: Street[];

  @OneToMany((type) => Location, (location) => location.street, { cascade: true })
  locations!: Location[];
}
