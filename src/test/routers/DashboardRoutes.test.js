import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";



    describe('pruebas en <DashboardRoutes />', () => {

        const contextValue={
            user:{
                logged:true,
                name:'Pepe',
            }
        }

        test('debe mostrarse correctamente', () => {

            const wrapper = mount(
                <AuthContext.Provider value={contextValue}>
                    <MemoryRouter>
                        <DashboardRoutes />
                    </MemoryRouter>
                </AuthContext.Provider>
            );

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('.text-info').text().trim()).toBe('Pepe');

        });
    });