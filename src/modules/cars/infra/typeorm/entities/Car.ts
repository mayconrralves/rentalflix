import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FloatTransformer } from '../../../../../utils/NumberTransformer';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column({
        type: "numeric",
        precision: 2,
        scale: 2,
        default: 0.0,
        transformer: new FloatTransformer()
    })
    daily_rate: number;
    
    @Column()
    available: boolean;
    
    @Column()
    license_plate: string;
    
      
    @Column({
        type: "numeric",
        precision: 2,
        scale: 2,
        default: 0.0,
        transformer: new FloatTransformer()
    })
    fine_amount: number;
    
    @Column()
    brand: string;
    
    @ManyToOne(()=> Category)
    @JoinColumn({ name: "category_id"})
    category: Category;
    
    @ManyToMany(()=> Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}],
        inverseJoinColumns: [{ name: "specification_id"}]
    })
    specifications: Specification [];
    
    @Column()
    category_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id) this.id = uuidv4();
        this.available = true;
    }
}

export { Car }